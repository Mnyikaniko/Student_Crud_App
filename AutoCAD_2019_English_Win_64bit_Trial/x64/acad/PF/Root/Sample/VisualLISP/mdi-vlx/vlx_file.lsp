;;;
;;;  VLX_FILE.LSP
;;;
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
;;;
;;;
;;; This VLX application demonstrates that variables can be exchanged
;;; between application and document namespaces and between application
;;; namespace and session blackboard.
(vl-load-com)

(vl-doc-export 'import_objs)
(defun C:import_objs ()
  (setq	thisDoc	      (vla-get-ActiveDocument (setq app (vlax-get-acad-object)))
	docs	      (vla-get-documents app)
	thisDocName   (vla-get-name thisDoc)
	thisDocBlocks (vla-get-blocks thisDoc)
	thisMS	      (vla-get-modelspace thisDoc)
  )


  (setq exclude_docs (list thisDocName))

  ; Retrieve and increment counter from active document's namespace.
  ; Counter reflects number of times this function has been invoked.
  (setq import_objs_cntr (vl-doc-set 'mdi-vlx-cntr
					 (1+ (vl-doc-ref 'mdi-vlx-cntr))))
   

  (while (equal "Y" (progn
		      (initget 0 "Y N")
		      (getkword "\nImport a transfer set into active document? [Y|N] ")
		      )
		)
    ; prompt user to identify an open document
    (setq message (strcat "\nCurrently in drawing "
			  thisDocName
			  ".\nXREF in drawing from open document:"
		  )
    )

    (setq
      chosenDoc	   (vla-item docs
			     (choose_item docs message exclude_docs)
		   )
      chosenName   (vla-get-name chosenDoc)

      chosenFile   (strcat "trans" (itoa import_objs_cntr) chosenName)

      chosenSelSet (vla-item (vla-get-SelectionSets chosenDoc)
			     "mdi-vlx"
		   )
    )
    (terpri)
    (princ chosenFile)

    (vla-wblock chosenDoc chosenFile chosenSelSet)

    				;clear chosenSelSet for next loop pass

    (princ
      (strcat "\n" (vla-get-fullname chosenDoc) " is selected\n")
    )

    (setq exclude_docs (cons chosenName exclude_docs))

    (setq InsertPt
	   (vlax-3d-point (getpoint "\nChoose insertion point.\n"))
    )
    (setq importBlock
	   (vla-InsertBlock
	     thisMS
	     InsertPt
	     chosenfile
	     1
	     1
	     1
	     0
	   )
    )

    (vl-file-delete chosenFile)
    (vla-regen thisDoc acActiveViewport)
    (vla-ZoomAll (vlax-get-acad-object))
  )
)

(defun choose_item
       (collection msg excludeGrp / obj index keywds curName)
       ;|
  Allows user to identify an item in a collection, excluding members of "excludeGrp".
  excludeGrp is a list of names which might coincide with the names of items
  in the ActiveX "collection".  The user is prompted to select one number from a menu of acceptable
  collection items.  The index of the item is then returned.
  |;
  (if (or (not (listp excludeGrp))
					; collection not a vla-object
      )
    (quit)
  )

  (terpri)
  (princ msg)
  (terpri)

  (setq	index 0
	keywds ""
  )
  (terpri)
  (vlax-for obj	collection
    (if	(not (member (setq curName (vla-get-name obj))
		     excludeGrp
	     )
	)
      (progn
	(princ (strcat "[" (itoa index) "] " curName))
	(terpri)
	(setq keywds (strcat keywds (itoa index) " "))
      )
    )
    (setq index (1+ index))
  )

  (initget 1 keywds)
  (atoi (getkword "\nEnter number for an open :"))
)






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
;;; AQsFADANBgkqhkiG9w0BAQEFAASCAQBT9benh6BjEfrW6x+wLvlnxK/ETOksBK9c
;;; +Of0wdgvv2kaktR0vyRf0BWv3NYt0vhuZEJRx+z8oSHmE3NrkKko4/Es2zM/Zs7N
;;; pDhSyi2qbPFXHuoiRRbaHoSmQ7ub3L3JnnMSFsRCW47+Ca0qWMn80EdyvsJBnhhm
;;; rqfQVXl+T38jyFKCKLYecOnfk/0yfhyfi1p92IkFflk2KHr2aKda/0TSiVk2WV0+
;;; WJnP4UvbUKNOVlLNS5qG5BWtJGQwLWiUSwlrLcZ93efVHytKfz3H5cwr3siK5YEG
;;; 3dQ1gGL8yCzW/wVPnvB1rpFxXkX/porEW3Fi3FlHkpJ8vZOOWaAloWUwYwYDVR0O
;;; MVwEWjQAMQA7ADEALwAzADAALwAyADAAMQA4AC8ANAAvADUAMgAvADEANQAvAFQA
;;; aQBtAGUAIABmAHIAbwBtACAAdABoAGkAcwAgAGMAbwBtAHAAdQB0AGUAcgAAAA==
;;; -----END-SIGNATURE-----