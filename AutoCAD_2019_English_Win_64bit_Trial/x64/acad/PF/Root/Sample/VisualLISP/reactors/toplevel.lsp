;;;                                                                    ;
;;;  TOPLEVEL.LSP                                                      ;
;;;                                                                    ;
;;;                                                                    ;
;;;  Copyright 1987, 1988, 1990, 1992, 1994, 1996, 1997, 1998, 1999    ;
;;;  by Autodesk, Inc. All Rights Reserved.                            ;
;;;                                                                    ;
;;;  You are hereby granted permission to use, copy and modify this    ;
;;;  software without charge, provided you do so exclusively for       ;
;;;  your own use or for use by others in your organization in the     ;
;;;  performance of their normal duties, and provided further that     ;
;;;  the above copyright notice appears in all copies and both that    ;
;;;  copyright notice and the limited warranty and restricted rights   ;
;;;  notice below appear in all supporting documentation.              ;
;;;                                                                    ;
;;;  Incorporation of any part of this software into other software,   ;
;;;  except when such incorporation is exclusively for your own use    ;
;;;  or for use by others in your organization in the performance of   ;
;;;  their normal duties, is prohibited without the prior written      ;
;;;  consent of Autodesk, Inc.                                         ;
;;;                                                                    ;
;;;  Copying, modification and distribution of this software or any    ;
;;;  part thereof in any form except as expressly provided herein is   ;
;;;  prohibited without the prior written consent of Autodesk, Inc.    ;
;;;                                                                    ;
;;;  AUTODESK PROVIDES THIS SOFTWARE "AS IS" AND WITH ALL FAULTS.      ;
;;;  AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF           ;
;;;  MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK,       ;
;;;  INC. DOES NOT WARRANT THAT THE OPERATION OF THE SOFTWARE          ;
;;;  WILL BE UNINTERRUPTED OR ERROR FREE.                              ;
;;;                                                                    ;
;;;  Restricted Rights for US Government Users.  This software         ;
;;;  and Documentation are provided with RESTRICTED RIGHTS for US      ;
;;;  US Government users.  Use, duplication, or disclosure by the      ;
;;;  Government is subject to restrictions as set forth in FAR         ;
;;;  12.212 (Commercial Computer Software-Restricted Rights) and       ;
;;;  DFAR 227.7202 (Rights in Technical Data and Computer Software),   ;
;;;  as applicable.  Manufacturer is Autodesk, Inc., 111 McInnis       ;
;;;  Parkway, San Rafael, California 94903.                            ;
;;;                                                                    ;

;;;--------------------------------------------------------------------;
;;; General Note:  THIS FILE IS A MEMBER OF THE REAC-TST PROJECT       ;
;;;--------------------------------------------------------------------;
;;; General Note:   The function call below is evaluated at load Time  ;
;;;                 and displays the top level help messages           ;
;;;                 associated with the project RCTR-TST.PRJ           ;
;;;--------------------------------------------------------------------;
(C:REACT-TEST-INFO)

;;;-----BEGIN-SIGNATURE-----
;;; SgcAADCCB0YGCSqGSIb3DQEHAqCCBzcwggczAgEBMQ8wDQYJKoZIhvcNAQELBQAw
;;; CwYJKoZIhvcNAQcBoIIE3jCCBNowggPCoAMCAQICEA5dK+WnG5bDemPmWVSBRBgw
;;; DQYJKoZIhvcNAQELBQAwgYQxCzAJBgNVBAYTAlVTMR0wGwYDVQQKExRTeW1hbnRl
;;; YyBDb3Jwb3JhdGlvbjEfMB0GA1UECxMWU3ltYW50ZWMgVHJ1c3QgTmV0d29yazE1
;;; MDMGA1UEAxMsU3ltYW50ZWMgQ2xhc3MgMyBTSEEyNTYgQ29kZSBTaWduaW5nIENB
;;; IC0gRzIwHhcNMTcwODA0MDAwMDAwWhcNMTgwODA0MjM1OTU5WjCBijELMAkGA1UE
;;; BhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExEzARBgNVBAcMClNhbiBSYWZhZWwx
;;; FzAVBgNVBAoMDkF1dG9kZXNrLCBJbmMuMR8wHQYDVQQLDBZEZXNpZ24gU29sdXRp
;;; b25zIEdyb3VwMRcwFQYDVQQDDA5BdXRvZGVzaywgSW5jLjCCASIwDQYJKoZIhvcN
;;; AQEBBQADggEPADCCAQoCggEBALPR50hy1FkrWOBmP+sGXfKWFUpFAKB9OLDlN3Uj
;;; 94WBLdHje+wsBav/AOL1Ben4qOa74PWpJHTJd8jph4MSGhKZE3oFNPyAVXCVhUAj
;;; qlLaYQXkHDWMeyz+y7FWX4oK1B1H+SNVcnc2+kAB0bEIT4VAIvQcyva41ThpVGzP
;;; XZM/JKDDpA6tocMQ3935UAjHYuvoOADEkFt5O/lEWzPTz0aQkVLGiD18rgFxuSw+
;;; Uz2jyuDZZ5lyNBQRF+K4cu8fle9uL2WqbaO7koHz76dkJrNW9wAmkdGCdfj3MQo+
;;; OD4O5JjSMYHEcmjVbHyo+ZK/BIVykApxc0tfN2HRJSuHlG0CAwEAAaOCAT4wggE6
;;; MAkGA1UdEwQCMAAwDgYDVR0PAQH/BAQDAgeAMBMGA1UdJQQMMAoGCCsGAQUFBwMD
;;; MGEGA1UdIARaMFgwVgYGZ4EMAQQBMEwwIwYIKwYBBQUHAgEWF2h0dHBzOi8vZC5z
;;; eW1jYi5jb20vY3BzMCUGCCsGAQUFBwICMBkMF2h0dHBzOi8vZC5zeW1jYi5jb20v
;;; cnBhMB8GA1UdIwQYMBaAFNTABiJJ6zlL3ZPiXKG4R3YJcgNYMCsGA1UdHwQkMCIw
;;; IKAeoByGGmh0dHA6Ly9yYi5zeW1jYi5jb20vcmIuY3JsMFcGCCsGAQUFBwEBBEsw
;;; STAfBggrBgEFBQcwAYYTaHR0cDovL3JiLnN5bWNkLmNvbTAmBggrBgEFBQcwAoYa
;;; aHR0cDovL3JiLnN5bWNiLmNvbS9yYi5jcnQwDQYJKoZIhvcNAQELBQADggEBALfg
;;; FRNU3/Np7SJ5TRs8s8tPnOTd4D5We+stLCuQ0I1kjVIyiIY+Z3cQz2AB9x8VXuYF
;;; LcXnT6Rc1cMYJtlTyB7Z7EZkfxQmFgc4chVfnguTpPqUtfo3QMT/S1+QIdYfIbk1
;;; dSvFBmZwRGatmGbn2h7HGiIgNqQaO6TD7Fx9TEJPwIiiCK8F3b4ENpYQHlgH3OAd
;;; CRLa1IWPfeA03yF3PIq8+NhLsngw1FNm9+C6UOM3mf3jHwxTrbt4ooIZstjPA4PU
;;; G16FkhJg7l2RCDR6sE9iT7FMCsO6tAHX3pS8afFyNyEVfgJVKfzohdDOj+XQLkzp
;;; c9v3Xoh1gTIPCte7VPsxggIsMIICKAIBATCBmTCBhDELMAkGA1UEBhMCVVMxHTAb
;;; BgNVBAoTFFN5bWFudGVjIENvcnBvcmF0aW9uMR8wHQYDVQQLExZTeW1hbnRlYyBU
;;; cnVzdCBOZXR3b3JrMTUwMwYDVQQDEyxTeW1hbnRlYyBDbGFzcyAzIFNIQTI1NiBD
;;; b2RlIFNpZ25pbmcgQ0EgLSBHMgIQDl0r5acblsN6Y+ZZVIFEGDANBgkqhkiG9w0B
;;; AQsFADANBgkqhkiG9w0BAQEFAASCAQB2/n3+WULJYiPTtwuYchSV+06Z8JCJ9Dxf
;;; BYCMU3ZbOUqKs92UvR7mVXjfxrkSmbQIXQdA4USSSzmi2SB6Et77SPt5kTcfdvZB
;;; 6HENmwDJkCwncDgbh9zWcA6bML9xo9NCn4DoYEVPVEXB48AOm/J9cHjsgthtOGAI
;;; R1Nm+XXG6raMLcVOmxhR3B9+tC6fiiSaXDOvPyVgcMAcUlRRbapuy9grOtm11nXP
;;; gn2LxhttaX2BARByF3nhXG8MD+vZoQULcr6AYIXmd369HmvYnwsjVl53KsP7LZ6k
;;; EbY+XuYu1rE7+BnaK2oqjfiauHQzJbh7UaojJFiOPG0pjeIm07KNoWUwYwYDVR0O
;;; MVwEWjQAMQA7ADEALwAzADAALwAyADAAMQA4AC8ANAAvADUAMgAvADIAMAAvAFQA
;;; aQBtAGUAIABmAHIAbwBtACAAdABoAGkAcwAgAGMAbwBtAHAAdQB0AGUAcgAAAA==
;;; -----END-SIGNATURE-----