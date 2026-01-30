//**************************************************************************/
// Copyright (c) 2007 Autodesk, Inc.
// All rights reserved.
// 
// These coded instructions, statements, and computer programs contain
// unpublished proprietary information written by Autodesk, Inc., and are
// protected by Federal copyright law. They may not be disclosed to third
// parties or copied or duplicated in any form, in whole or in part, without
// the prior written consent of Autodesk, Inc.
//**************************************************************************/
// DESCRIPTION: Normal and depth buffer generator
// AUTHOR: Wei Guo
// CREATED: October 2008
//**************************************************************************/

//-----------------------------------------------------------------------------
// PARAMETERS
//-----------------------------------------------------------------------------

float4x4 g_matWorldViewProj		: WorldViewProjection;
float4x4 g_matWorldView			: WorldView;

struct VS_INPUT
{
    float3 Pos  : POSITION;
};

struct PS_INPUT
{
    float4 HPosition    : SV_POSITION;
    float3 EyePos       : TEXCOORD0;
};

struct PS_OUTPUT_ND
{
    float4 NormalDepth   : SV_Target0;
};

//-----------------------------------------------------------------------------
// Vertex Shader
//-----------------------------------------------------------------------------

PS_INPUT VS_Scene( VS_INPUT input )
{
    PS_INPUT output;
    
    output.HPosition = mul( float4(input.Pos,1), g_matWorldViewProj );
    
    output.EyePos = mul( float4(input.Pos,1), g_matWorldView );
    return output;
}

PS_OUTPUT_ND PS_SceneND( PS_INPUT In )
{   
    PS_OUTPUT_ND Out = (PS_OUTPUT_ND)0;
    Out.NormalDepth.xyz = normalize(cross(ddx(In.EyePos.xyz), ddy(In.EyePos.xyz)));
    Out.NormalDepth.w=In.EyePos.z;
    return Out;
}

technique10 RenderSceneNormalDepth
{
    pass p0
    {
        SetVertexShader  ( CompileShader( vs_4_0, VS_Scene( ) ) );
        SetGeometryShader( NULL );
        SetPixelShader   ( CompileShader( ps_4_0, PS_SceneND( ) ) );  
    }
}