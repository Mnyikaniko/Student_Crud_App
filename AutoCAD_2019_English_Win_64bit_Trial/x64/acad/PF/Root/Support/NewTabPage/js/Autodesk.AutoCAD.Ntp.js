//---start of generated typescript---
// 
//////////////////////////////////////////////////////////////////////////////
//
// (C) Copyright 2012 by Autodesk, Inc.
//
// The information contained herein is confidential, proprietary to Autodesk,
// Inc., and considered a trade secret as defined in section 499C of the
// penal code of the State of California.  Use of this information by anyone
// other than authorized employees of Autodesk, Inc. is granted only under a
// written non-disclosure agreement, expressly prescribing the scope and
// manner of such use.
//
//////////////////////////////////////////////////////////////////////////////
//---end of generated typescript--- 
//---start of generated typescript---
// 
//////////////////////////////////////////////////////////////////////////////
//
// (C) Copyright 2012 by Autodesk, Inc.
//
// The information contained herein is confidential, proprietary to Autodesk,
// Inc., and considered a trade secret as defined in section 499C of the
// penal code of the State of California.  Use of this information by anyone
// other than authorized employees of Autodesk, Inc. is granted only under a
// written non-disclosure agreement, expressly prescribing the scope and
// manner of such use.
//
//////////////////////////////////////////////////////////////////////////////
// Include TS files
///<reference path="CommonTypes.ts"/>
var ntp;
(function (ntp) {
    var Api;
    (function (Api) {
        function loadProjectsAsJSON() {
            var jsonStr = exec(JSON.stringify({
                functionName: 'ntp_Api.loadProjectsAsJSON', functionParams: {}
            }));
            var jsonObj = JSON.parse(jsonStr);
            //retcode must be present
            if (jsonObj.retCode == undefined)
                throw TypeError("Internal error: retCode is not present.");
            if (jsonObj.retCode != Autodesk.JavaScript.ErrorStatus.eOk) {
                throw jsonObj;
            }
            if (typeof (apiVersion) == 'function' && apiVersion() > 2) {
                return jsonObj.retValue;
            }
            else {
                //OLD serialization logic:
                //hoist retValue if present
                if (jsonObj.retValue)
                    return JSON.parse(jsonObj.retValue);
                return jsonObj;
            }
        } //end of function
        Api.loadProjectsAsJSON = loadProjectsAsJSON;
    })(Api = ntp.Api || (ntp.Api = {})); //end module Api
})(ntp || (ntp = {}));
//---end of generated typescript--- 
//# sourceMappingURL=Autodesk.AutoCAD.Ntp.js.map
// SIG // Begin signature block
// SIG // MIIZuQYJKoZIhvcNAQcCoIIZqjCCGaYCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // 44EP1I38tpteQK4wxD96cBrZMW4kiVm5Se1nyTVxG7mg
// SIG // ggopMIIE2jCCA8KgAwIBAgIQDl0r5acblsN6Y+ZZVIFE
// SIG // GDANBgkqhkiG9w0BAQsFADCBhDELMAkGA1UEBhMCVVMx
// SIG // HTAbBgNVBAoTFFN5bWFudGVjIENvcnBvcmF0aW9uMR8w
// SIG // HQYDVQQLExZTeW1hbnRlYyBUcnVzdCBOZXR3b3JrMTUw
// SIG // MwYDVQQDEyxTeW1hbnRlYyBDbGFzcyAzIFNIQTI1NiBD
// SIG // b2RlIFNpZ25pbmcgQ0EgLSBHMjAeFw0xNzA4MDQwMDAw
// SIG // MDBaFw0xODA4MDQyMzU5NTlaMIGKMQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECAwKQ2FsaWZvcm5pYTETMBEGA1UEBwwK
// SIG // U2FuIFJhZmFlbDEXMBUGA1UECgwOQXV0b2Rlc2ssIElu
// SIG // Yy4xHzAdBgNVBAsMFkRlc2lnbiBTb2x1dGlvbnMgR3Jv
// SIG // dXAxFzAVBgNVBAMMDkF1dG9kZXNrLCBJbmMuMIIBIjAN
// SIG // BgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs9HnSHLU
// SIG // WStY4GY/6wZd8pYVSkUAoH04sOU3dSP3hYEt0eN77CwF
// SIG // q/8A4vUF6fio5rvg9akkdMl3yOmHgxIaEpkTegU0/IBV
// SIG // cJWFQCOqUtphBeQcNYx7LP7LsVZfigrUHUf5I1Vydzb6
// SIG // QAHRsQhPhUAi9BzK9rjVOGlUbM9dkz8koMOkDq2hwxDf
// SIG // 3flQCMdi6+g4AMSQW3k7+URbM9PPRpCRUsaIPXyuAXG5
// SIG // LD5TPaPK4NlnmXI0FBEX4rhy7x+V724vZapto7uSgfPv
// SIG // p2Qms1b3ACaR0YJ1+PcxCj44Pg7kmNIxgcRyaNVsfKj5
// SIG // kr8EhXKQCnFzS183YdElK4eUbQIDAQABo4IBPjCCATow
// SIG // CQYDVR0TBAIwADAOBgNVHQ8BAf8EBAMCB4AwEwYDVR0l
// SIG // BAwwCgYIKwYBBQUHAwMwYQYDVR0gBFowWDBWBgZngQwB
// SIG // BAEwTDAjBggrBgEFBQcCARYXaHR0cHM6Ly9kLnN5bWNi
// SIG // LmNvbS9jcHMwJQYIKwYBBQUHAgIwGQwXaHR0cHM6Ly9k
// SIG // LnN5bWNiLmNvbS9ycGEwHwYDVR0jBBgwFoAU1MAGIknr
// SIG // OUvdk+JcobhHdglyA1gwKwYDVR0fBCQwIjAgoB6gHIYa
// SIG // aHR0cDovL3JiLnN5bWNiLmNvbS9yYi5jcmwwVwYIKwYB
// SIG // BQUHAQEESzBJMB8GCCsGAQUFBzABhhNodHRwOi8vcmIu
// SIG // c3ltY2QuY29tMCYGCCsGAQUFBzAChhpodHRwOi8vcmIu
// SIG // c3ltY2IuY29tL3JiLmNydDANBgkqhkiG9w0BAQsFAAOC
// SIG // AQEAt+AVE1Tf82ntInlNGzyzy0+c5N3gPlZ76y0sK5DQ
// SIG // jWSNUjKIhj5ndxDPYAH3HxVe5gUtxedPpFzVwxgm2VPI
// SIG // HtnsRmR/FCYWBzhyFV+eC5Ok+pS1+jdAxP9LX5Ah1h8h
// SIG // uTV1K8UGZnBEZq2YZufaHscaIiA2pBo7pMPsXH1MQk/A
// SIG // iKIIrwXdvgQ2lhAeWAfc4B0JEtrUhY994DTfIXc8irz4
// SIG // 2EuyeDDUU2b34LpQ4zeZ/eMfDFOtu3iighmy2M8Dg9Qb
// SIG // XoWSEmDuXZEINHqwT2JPsUwKw7q0AdfelLxp8XI3IRV+
// SIG // AlUp/OiF0M6P5dAuTOlz2/deiHWBMg8K17tU+zCCBUcw
// SIG // ggQvoAMCAQICEHwbNTVK59t050FfEWnKa6gwDQYJKoZI
// SIG // hvcNAQELBQAwgb0xCzAJBgNVBAYTAlVTMRcwFQYDVQQK
// SIG // Ew5WZXJpU2lnbiwgSW5jLjEfMB0GA1UECxMWVmVyaVNp
// SIG // Z24gVHJ1c3QgTmV0d29yazE6MDgGA1UECxMxKGMpIDIw
// SIG // MDggVmVyaVNpZ24sIEluYy4gLSBGb3IgYXV0aG9yaXpl
// SIG // ZCB1c2Ugb25seTE4MDYGA1UEAxMvVmVyaVNpZ24gVW5p
// SIG // dmVyc2FsIFJvb3QgQ2VydGlmaWNhdGlvbiBBdXRob3Jp
// SIG // dHkwHhcNMTQwNzIyMDAwMDAwWhcNMjQwNzIxMjM1OTU5
// SIG // WjCBhDELMAkGA1UEBhMCVVMxHTAbBgNVBAoTFFN5bWFu
// SIG // dGVjIENvcnBvcmF0aW9uMR8wHQYDVQQLExZTeW1hbnRl
// SIG // YyBUcnVzdCBOZXR3b3JrMTUwMwYDVQQDEyxTeW1hbnRl
// SIG // YyBDbGFzcyAzIFNIQTI1NiBDb2RlIFNpZ25pbmcgQ0Eg
// SIG // LSBHMjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBANeVQ9Tc32euOftSpLYmMQRw6beOWyq6N2k1lY+7
// SIG // wDDnhthzu9/r0XY/ilaO6y1L8FcYTrGNpTPTC3Uj1Wp5
// SIG // J92j0/cOh2W13q0c8fU1tCJRryKhwV1LkH/AWU6rnXmp
// SIG // AtceSbE7TYf+wnirv+9SrpyvCNk55ZpRPmlfMBBOcWNs
// SIG // WOHwIDMbD3S+W8sS4duMxICUcrv2RZqewSUL+6Mcntim
// SIG // CXBx7MBHTI99w94Zzj7uBHKOF9P/8LIFMhlM07Acn/6l
// SIG // eCBCcEGwJoxvAMg6ABFBekGwp4qRBKCZePR3tPNgKuZs
// SIG // UAS3FGD/DVH0qIuE/iHaXF599Sl5T7BEdG9tcv8CAwEA
// SIG // AaOCAXgwggF0MC4GCCsGAQUFBwEBBCIwIDAeBggrBgEF
// SIG // BQcwAYYSaHR0cDovL3Muc3ltY2QuY29tMBIGA1UdEwEB
// SIG // /wQIMAYBAf8CAQAwZgYDVR0gBF8wXTBbBgtghkgBhvhF
// SIG // AQcXAzBMMCMGCCsGAQUFBwIBFhdodHRwczovL2Quc3lt
// SIG // Y2IuY29tL2NwczAlBggrBgEFBQcCAjAZGhdodHRwczov
// SIG // L2Quc3ltY2IuY29tL3JwYTA2BgNVHR8ELzAtMCugKaAn
// SIG // hiVodHRwOi8vcy5zeW1jYi5jb20vdW5pdmVyc2FsLXJv
// SIG // b3QuY3JsMBMGA1UdJQQMMAoGCCsGAQUFBwMDMA4GA1Ud
// SIG // DwEB/wQEAwIBBjApBgNVHREEIjAgpB4wHDEaMBgGA1UE
// SIG // AxMRU3ltYW50ZWNQS0ktMS03MjQwHQYDVR0OBBYEFNTA
// SIG // BiJJ6zlL3ZPiXKG4R3YJcgNYMB8GA1UdIwQYMBaAFLZ3
// SIG // +mlIR59TEtXC6gcydgfRlwcZMA0GCSqGSIb3DQEBCwUA
// SIG // A4IBAQB/68qn6ot2Qus+jiBUMOO3udz6SD4Wxw9FlRDN
// SIG // J4ajZvMC7XH4qsJVl5Fwg/lSflJpPMnx4JRGgBi7odSk
// SIG // VqbzHQCR1YbzSIfgy8Q0aCBetMv5Be2cr3BTJ7noPn5R
// SIG // oGlxi9xR7YA6JTKfRK9uQyjTIXW7l9iLi4z+qQRGBIX3
// SIG // FZxLEY3ELBf+1W5/muJWkvGWs60t+fTf2omZzrI4RMD3
// SIG // R3vKJbn6Kmgzm1By3qif1M0sCzS9izB4QOCNjicbkG8a
// SIG // vggVgV3rL+JR51EeyXgp5x5lvzjvAUoBCSQOFsQUecFB
// SIG // NzTQPZFSlJ3haO8I8OJpnGdukAsak3HUJgLDwFojMYIO
// SIG // 6DCCDuQCAQEwgZkwgYQxCzAJBgNVBAYTAlVTMR0wGwYD
// SIG // VQQKExRTeW1hbnRlYyBDb3Jwb3JhdGlvbjEfMB0GA1UE
// SIG // CxMWU3ltYW50ZWMgVHJ1c3QgTmV0d29yazE1MDMGA1UE
// SIG // AxMsU3ltYW50ZWMgQ2xhc3MgMyBTSEEyNTYgQ29kZSBT
// SIG // aWduaW5nIENBIC0gRzICEA5dK+WnG5bDemPmWVSBRBgw
// SIG // DQYJYIZIAWUDBAIBBQCgfDAQBgorBgEEAYI3AgEMMQIw
// SIG // ADAZBgkqhkiG9w0BCQMxDAYKKwYBBAGCNwIBBDAcBgor
// SIG // BgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIBFTAvBgkqhkiG
// SIG // 9w0BCQQxIgQgB6/cJOS5roXYP344P+yX2lDxINXWjw/U
// SIG // yPRPKxjBE/owDQYJKoZIhvcNAQEBBQAEggEATPigCbOE
// SIG // LRWbdy/RUZho1TMCDV+wBZ29KgRQVkwoFV2EbqXE0jGf
// SIG // VhLPPYlTP5ct1BA/G4bewulmfFP3MjiUyBPMeUFywH5A
// SIG // yO9zwmKzHeuhovIaB8yZBGpEY11ulEDZbof1tjCpqIHD
// SIG // CgEjbVCvL4c57wzBxhDILQE6NfGXAabnvUMuderAp9Sw
// SIG // QAQAmqqauZtxDO6AOU1Jmdu4p5E8OmNyzn89KMGxg+/x
// SIG // hpQh1NQOmcp9AM5leCoPpIoJ5AbEAZaKXHYKNXeAvETc
// SIG // OnnbN1AEyREQ9iBaQig5X5RyXYptNce3TECbl4VPAxBl
// SIG // pEGDID53UcnnqRHd/Y+XEl6/oKGCDKEwggydBgorBgEE
// SIG // AYI3AwMBMYIMjTCCDIkGCSqGSIb3DQEHAqCCDHowggx2
// SIG // AgEDMQ8wDQYJYIZIAWUDBAIBBQAwgd0GCyqGSIb3DQEJ
// SIG // EAEEoIHNBIHKMIHHAgEBBgkrBgEEAaAyAgMwMTANBglg
// SIG // hkgBZQMEAgEFAAQgOkwpxze5cGMjuh+S2GWK3MGxMjDW
// SIG // GzGA3Yc3Ta9UDMMCFF5s43TZXOUbvZOcx92944IsqB9B
// SIG // GA8yMDE4MDEzMDA0NDUxNFqgXaRbMFkxCzAJBgNVBAYT
// SIG // AlNHMR8wHQYDVQQKExZHTU8gR2xvYmFsU2lnbiBQdGUg
// SIG // THRkMSkwJwYDVQQDEyBHbG9iYWxTaWduIFRTQSBmb3Ig
// SIG // QWR2YW5jZWQgLSBHMqCCCMYwggSpMIIDkaADAgECAhIR
// SIG // IQbxD85o8Jv65VsYzY8gAXcwDQYJKoZIhvcNAQELBQAw
// SIG // WzELMAkGA1UEBhMCQkUxGTAXBgNVBAoTEEdsb2JhbFNp
// SIG // Z24gbnYtc2ExMTAvBgNVBAMTKEdsb2JhbFNpZ24gVGlt
// SIG // ZXN0YW1waW5nIENBIC0gU0hBMjU2IC0gRzIwHhcNMTYw
// SIG // NTI0MDAwMDAwWhcNMjcwNjI0MDAwMDAwWjBZMQswCQYD
// SIG // VQQGEwJTRzEfMB0GA1UEChMWR01PIEdsb2JhbFNpZ24g
// SIG // UHRlIEx0ZDEpMCcGA1UEAxMgR2xvYmFsU2lnbiBUU0Eg
// SIG // Zm9yIEFkdmFuY2VkIC0gRzIwggEiMA0GCSqGSIb3DQEB
// SIG // AQUAA4IBDwAwggEKAoIBAQC3x5KKKNjzkctQDV3rKUTB
// SIG // glmlymTOvYO1UeWUzG6Amhds3P9i5jZDXgHCDGSNynee
// SIG // 9l13RbleyCTrQTcRZjesyM10m8yz70zifxvOc77Jlp01
// SIG // Hnz3VPds7KAS1q6ZnWPEeF9ZqS4i9cMn2LJbRWMnkP+M
// SIG // sT2ptPMOwPEgZQaJnQMco7BSQYU067zLzlT2Ev6zAYlK
// SIG // pvpUxR/70xzA47+X4z/QG/lAxxvV6yZ8QzDHcPJ4EaqF
// SIG // TqUODQBKOhF3o8ojAYCeyJNWXUbMitjSqgqEhbKJW9Uy
// SIG // zkF7GE5UyqvRUl4S0ySeVvMMj929ko551UGJw6Og5ZH8
// SIG // x2edhzPOcTJzAgMBAAGjggFnMIIBYzAOBgNVHQ8BAf8E
// SIG // BAMCB4AwTAYDVR0gBEUwQzBBBgkrBgEEAaAyAR4wNDAy
// SIG // BggrBgEFBQcCARYmaHR0cHM6Ly93d3cuZ2xvYmFsc2ln
// SIG // bi5jb20vcmVwb3NpdG9yeS8wCQYDVR0TBAIwADAWBgNV
// SIG // HSUBAf8EDDAKBggrBgEFBQcDCDBGBgNVHR8EPzA9MDug
// SIG // OaA3hjVodHRwOi8vY3JsLmdsb2JhbHNpZ24uY29tL2dz
// SIG // L2dzdGltZXN0YW1waW5nc2hhMmcyLmNybDBYBggrBgEF
// SIG // BQcBAQRMMEowSAYIKwYBBQUHMAKGPGh0dHA6Ly9zZWN1
// SIG // cmUuZ2xvYmFsc2lnbi5jb20vY2FjZXJ0L2dzdGltZXN0
// SIG // YW1waW5nc2hhMmcyLmNydDAdBgNVHQ4EFgQULW5u0Y3l
// SIG // A4Du52Ppp9naCzxXIj0wHwYDVR0jBBgwFoAUkiGnSpVd
// SIG // ZLCbtB7mADdH5p1BK0wwDQYJKoZIhvcNAQELBQADggEB
// SIG // AFedU+Td7qUs3uS/YoCiYYZKn5udJCMwm48nhy/6BFnO
// SIG // cIg9RlJ3xJtF0o+9tyEYSdguh/+SLnf5Pwr5oCFcE0/k
// SIG // hCsoh8xcFbkTq+ISVcP4RR5JGc6qdQ8h6O9R/DQsCzIF
// SIG // CbLkFmmt2S5+4fwtSL8a03Q1ATrfMENwZ3o417oRwlb7
// SIG // MUi6W/EhEmLgdomRH0k41FhNeQmKqdpvAtat5NqJfUzZ
// SIG // sTBwQGrbRbpTdpDcS0IWIc/k0liU1FVlm3YDrK4YCLaD
// SIG // EoxBPl+ARWTIidQzF6GhTL0/xJL+f4XyvrGs1/aey84T
// SIG // Ku4CQ0/8/3A1NKMzfM/iDTIkIHwAPqMyEd4wggQVMIIC
// SIG // /aADAgECAgsEAAAAAAExicZQBDANBgkqhkiG9w0BAQsF
// SIG // ADBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0Eg
// SIG // LSBSMzETMBEGA1UEChMKR2xvYmFsU2lnbjETMBEGA1UE
// SIG // AxMKR2xvYmFsU2lnbjAeFw0xMTA4MDIxMDAwMDBaFw0y
// SIG // OTAzMjkxMDAwMDBaMFsxCzAJBgNVBAYTAkJFMRkwFwYD
// SIG // VQQKExBHbG9iYWxTaWduIG52LXNhMTEwLwYDVQQDEyhH
// SIG // bG9iYWxTaWduIFRpbWVzdGFtcGluZyBDQSAtIFNIQTI1
// SIG // NiAtIEcyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
// SIG // CgKCAQEAqpuOw6sRUSUBtpaU4k/YwQj2RiPZRcWVl1ur
// SIG // Gr/SbFfJMwYfoA/GPH5TSHq/nYeer+7DjEfhQuzj46FK
// SIG // bAwXxKbBuc1b8R5EiY7+C94hWBPuTcjFZwscsrPxNHaR
// SIG // ossHbTfFoEcmAhWkkJGpeZ7X61edK3wi2BTX8QceeCI2
// SIG // a3d5r6/5f45O4bUIMf3q7UtxYowj8QM5j0R5tnYDV56t
// SIG // LwhG3NKMvPSOdM7IaGlRdhGLD10kWxlUPSbMQI2CJxtZ
// SIG // IH1Z9pOAjvgqOP1roEBlH1d2zFuOBE8sqNuEUBNPxtyL
// SIG // ufjdaUyI65x7MCb8eli7WbwUcpKBV7d2ydiACoBuCQID
// SIG // AQABo4HoMIHlMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMB
// SIG // Af8ECDAGAQH/AgEAMB0GA1UdDgQWBBSSIadKlV1ksJu0
// SIG // HuYAN0fmnUErTDBHBgNVHSAEQDA+MDwGBFUdIAAwNDAy
// SIG // BggrBgEFBQcCARYmaHR0cHM6Ly93d3cuZ2xvYmFsc2ln
// SIG // bi5jb20vcmVwb3NpdG9yeS8wNgYDVR0fBC8wLTAroCmg
// SIG // J4YlaHR0cDovL2NybC5nbG9iYWxzaWduLm5ldC9yb290
// SIG // LXIzLmNybDAfBgNVHSMEGDAWgBSP8Et/qC5FJK5NUPpj
// SIG // move4t0bvDANBgkqhkiG9w0BAQsFAAOCAQEABFaCSnzQ
// SIG // zsm/NmbRvjWek2yX6AbOMRhZ+WxBX4AuwEIluBjH/NSx
// SIG // N8RooM8oagN0S2OXhXdhO9cv4/W9M6KSfREfnops7yyw
// SIG // 9GKNNnPRFjbxvF7stICYePzSdnno4SGU4B/EouGqZ9uz
// SIG // nHPlQCLPOc7b5neVp7uyy/YZhp2fyNSYBbJxb051rvE9
// SIG // ZGo7Xk5GpipdCJLxo/MddL9iDSOMXCo4ldLA1c3PiNof
// SIG // KLW6gWlkKrWmotVzr9xG2wSukdduxZi61EfEVnSAR3hY
// SIG // jL7vK/3sbL/RlPe/UOB74JD9IBh4GCJdCC6MHKCX8x2Z
// SIG // faOdkdMGRE4EbnocIOM28LZQuTGCArQwggKwAgEBMHEw
// SIG // WzELMAkGA1UEBhMCQkUxGTAXBgNVBAoTEEdsb2JhbFNp
// SIG // Z24gbnYtc2ExMTAvBgNVBAMTKEdsb2JhbFNpZ24gVGlt
// SIG // ZXN0YW1waW5nIENBIC0gU0hBMjU2IC0gRzICEhEhBvEP
// SIG // zmjwm/rlWxjNjyABdzANBglghkgBZQMEAgEFAKCCARQw
// SIG // GgYJKoZIhvcNAQkDMQ0GCyqGSIb3DQEJEAEEMBwGCSqG
// SIG // SIb3DQEJBTEPFw0xODAxMzAwNDQ1MTRaMC8GCSqGSIb3
// SIG // DQEJBDEiBCBnkrhBClltPTqt+dcRzbd4Xs3wvEUJbDOz
// SIG // U8+m8UNZ7zCBpgYLKoZIhvcNAQkQAgwxgZYwgZMwgZAw
// SIG // gY0EFH1V2OdaVqL8c4JD97hUh1xctSoNMHUwX6RdMFsx
// SIG // CzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWdu
// SIG // IG52LXNhMTEwLwYDVQQDEyhHbG9iYWxTaWduIFRpbWVz
// SIG // dGFtcGluZyBDQSAtIFNIQTI1NiAtIEcyAhIRIQbxD85o
// SIG // 8Jv65VsYzY8gAXcwDQYJKoZIhvcNAQEBBQAEggEAH7Ol
// SIG // 7ctPbxY8mQx+6rYe8AH2TGCzL3om+jDut2gOWjIipfLm
// SIG // nP642etCZwOc3rF/DwfDCiAmI0A22ct1hiS0niO6UalE
// SIG // amcSUzR9Xt/C5gZf04TOh9BvFnoEdfkE8iTuVfaQ3aqL
// SIG // gcEpm8rj/DWXSq4dg8wstf+lJmNywE0hRsvXohHnC/HQ
// SIG // ZdtjZFWhZkAglpzb+4a/TNtzmg9XsQvR+bYY/xxqRRa3
// SIG // lO1zDGlFQEf64ehYBFJOAbdLf5Mk7cER03GDONmGZIPb
// SIG // teniwo/QfgalVggoToNzhknbOOm7yKkTL70uoLcRwwt+
// SIG // QYpDd/Mwq56bx3IPaGKzaghlHkhL9A==
// SIG // End signature block
