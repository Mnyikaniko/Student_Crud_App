;;
;;  Tcase.lsp - Changes case of selected text, attdefs, attributes, dimension text,
;;               mtext, arcalignedtext and rtext.
;;                    
;;
;;  Copyright © 1999-2006 by Autodesk, Inc.
;;
;;  Your use of this software is governed by the terms and conditions
;;  of the License Agreement you accepted prior to installation of this
;;  software.  Please note that pursuant to the License Agreement for this
;;  software, "[c]opying of this computer program or its documentation
;;  except as permitted by this License is copyright infringement under
;;  the laws of your country.  If you copy this computer program without
;;  permission of Autodesk, you are violating the law."
;;
;;  AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
;;  AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
;;  MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
;;  DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
;;  UNINTERRUPTED OR ERROR FREE.
;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; TCASE
; changes the case of selected annotation objects.
;
(defun c:tcase ( / lst )
 (acet-error-init (list '("cmdecho" 0) T))
 (if (setq lst (acet-tcase-ui nil))
     (acet-tcase (car lst) (cadr lst))
 );if
 (acet-error-restore)
);defun c:tcase
 
 
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defun c:-tcase ( / lst )
 (acet-error-init (list '("cmdecho" 0) T))
 (if (setq lst (acet-tcase-ui T))
     (acet-tcase (car lst) (cadr lst))
 );if
 (acet-error-restore)
);defun c:-tcase
 
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;If the cmdline arg is true then command will be command line line driven.
;
(defun acet-tcase-ui ( cmdline / flt ss lst )
 (setq flt '((-4 . "<OR") 
              (0 . "TEXT")
              (0 . "ATTDEF")
              (0 . "MTEXT")
              (0 . "DIMENSION")
              (0 . "RTEXT")
              (0 . "ARCALIGNEDTEXT")
              (-4 . "<AND") (0 . "INSERT") (66 . 1) (-4 . "AND>")
             (-4 . "OR>")
            )
 );setq
 (if (setq ss (ssget "_:L" flt))
     (progn
      (if (or cmdline
              (= 4 (logand 4 (getvar "cmdactive")))
              (= 0 (getvar "cmddia"))
          );or
          (setq lst (acet-tcase-ui-cmd))
          (setq lst (acet-tcase-ui-dlg))
      );if
      (if lst
          (setq lst (cons ss lst))
      );if
     );progn then
 );if
 lst
);defun tcase-ui
 
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defun acet-tcase-ui-cmd ( / ans def lst )
 
 (setq def (acet-getvar '("ACET-TCASE-MODE")))
 (if (not def)
     (setq def "Upper")
 );if
 (initget "Sentence Lower Upper Title toGgle")
 (setq ans (getkword 
            (acet-str-format "\nSelect case [Sentence/Lower/Upper/Title/toGgle] <%1>: "
                             def
            )
           );getkword
 );setq
 (if (not ans)
     (setq ans def)
 );if
 (acet-setvar (list "ACET-TCASE-MODE" ans 3)) ;; store it in the drawing and in the profile
 
 (list ans)
);defun acet-tcase-ui-cmd
 
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;acet-tcase-dlg
;returns one of the following strings if OK is pressed:
;"Sentence Lower Upper Title toGgle"
;Returns nil on cancel
;
(defun acet-tcase-ui-dlg ( / iv flag set_bit mode lst )
 
 
 (if (> (setq iv (load_dialog (getfileET "tcase.dcl")));setq
        0
     );test
     (progn
      (if (new_dialog "tcase" iv)
          (progn
           (setq mode (acet-getvar '("ACET-TCASE-MODE")))
           (if (not mode)
               (setq mode "UPPER")
               (setq mode (xstrcase mode))
           );if
 
           (cond
            ((= mode "UPPER")
             (set_tile "upper" "1")
            );cond #1
            ((= mode "LOWER")
             (set_tile "lower" "1")
            );cond #2
            ((= mode "SENTENCE")
             (set_tile "sentence" "1")
            );cond #3
            ((= mode "TITLE")
             (set_tile "title" "1")
            );cond #4
            ((= mode "TOGGLE")
             (set_tile "toggle" "1")
            );cond #5
           );cond close
         
           (action_tile "upper"    "(setq mode \"upper\")")
           (action_tile "lower"    "(setq mode \"lower\")")
           (action_tile "sentence" "(setq mode \"sentence\")")
           (action_tile "title"    "(setq mode \"title\")")
           (action_tile "toggle"   "(setq mode \"toggle\")")
   
           (action_tile "accept" "(done_dialog 1)")
           (action_tile "cancel" "(done_dialog 0)")
           (action_tile "help" "(acet-help \"TCASE\")")
 
           (setq flag (start_dialog));setq
           (if (equal flag 1)
               (progn
                (acet-setvar (list "ACET-TCASE-MODE" (xstrcase mode) 3))
                (setq lst (list mode));setq
               );progn
               (setq mode nil)
           );if
          );progn then initialize the tiles and activate the dialog box
          (alert "Unable to display dialog box")
      );if new dialog
      (unload_dialog iv);unload it when done
     );progn then
     (alert "Unable to load dialog box");else
 );if load
 lst
);defun acet-tcase-ui-dlg
 
 
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defun acet-tcase ( ss mode / na e1 n x tp e2 flag frmt a )
 (setq n 0)
 (repeat (sslength ss)
  (setq na (ssname ss n)
        e1 (entget na)
  );setq
  (if (= 1 (cdr (assoc 66 e1)))
      (setq flag T)
      (setq flag nil)
  );if
  (while e1
   (setq tp (cdr (assoc 0 e1)))
   (cond
    ((or (= tp "TEXT")
         (= tp "ATTDEF")
         (= tp "ATTRIB")
         (= tp "ARCALIGNEDTEXT")
         (= tp "DIMENSION")
         (= tp "RTEXT")
     );or
        (setq e2 nil)
        (if (and (or (= tp "ATTDEF") (= tp "ATTRIB"))
                 (_matts_util na)
            )
           (progn
                ; Special case handling for multiline text attributes
                (setq x (_matts_util na 2))
                (if (= (type x) 'LIST)
                    (progn
                         (setq x (car x))
                         (setq a (cdr x))
                         (setq frmt (acet-mtext-format-extract a)
                               a (car frmt)
                               frmt (cadr frmt)
                         );setq
                         (setq a (acet-tcase-change-string a mode)
                              a (acet-mtext-format-apply a frmt)
                         );setq
                         (setq x (cons (car x) a))
                         (_matts_util na 3 x)
                    )
                )
           )
           (progn
              ; Process single line attributes using entmod
              (foreach x e1
                (if (or (= (car x) 1)
                        (= (car x) 3)
                    );or
                    (setq x (cons (car x) 
                                  (acet-tcase-change-string (cdr x) mode)
                            );cons
                     );setq then modify the case
                );if
                (setq e2 (cons x e2))
              );foreach
              (entmod (reverse e2))
           )
        );if ATTDEF/ATTRIB & multiline
    );cond #1
    ((= tp "MTEXT")
	;; first get the entire string 
        ;; then strip formatting and apply case changes
        ;; re-apply formating
        ;; place string back into elist and entmod
  
        (setq a "")
        (foreach x e1
         (if (or (= (car x) 1)
                 (= (car x) 3)
             );or
             (setq a (strcat a (cdr x)));setq then
         );if
        );foreach
        (setq frmt (acet-mtext-format-extract a)
                 a (car frmt)
              frmt (cadr frmt)
        );setq
        (setq a (acet-tcase-change-string a mode)
              a (acet-mtext-format-apply a frmt)
        );setq
        
        (setq e2 nil)
        (foreach x e1
         (if (or (= (car x) 1)
                 (= (car x) 3)
             );or
             (setq x (cons (car x) 
                           (substr a 1 (strlen (cdr x)))
                     );cons
                   a (substr a (+ (strlen (cdr x)) 1))
             );setq then 
         );if
         (setq e2 (cons x e2))
        );foreach
        (entmod (reverse e2))
    );cond #2
   );cond close
   (if flag
       (progn
        (if (= tp "SEQEND")
            (progn
             (entmod e1)
             (entmod (entget (ssname ss n)))
             (entupd (ssname ss n))
             (setq e1 nil)
            );progn then
            (progn
             (if (setq na (entnext na))
                 (setq e1 (entget na))
             );if 
            );progn
        );if
       );progn then
       (setq e1 nil)
   );if
  );while
  (setq n (+ n 1));setq
 );repeat
 
);defun tcase


(acet-autoload2	'("tcaseSup.lsp"	(acet-mtext-format-apply str flst)))
(acet-autoload2	'("tcaseSup.lsp"	(acet-mtext-format-extract str)))
(acet-autoload2	'("tcaseSup.lsp"	(acet-tcase-change-string a mode)))
(princ)
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
;;; AQsFADANBgkqhkiG9w0BAQEFAASCAQBmklNVMTvro79opjFgOw0Fs+ITZ1mzzxsi
;;; vmmM9fTmbMWF1H75wdSnsMH/gDBzheyVXjCRi7y6XOb2q/R+nBwdk2+awR4vKRSg
;;; dGZLMzKk0IaKMY/9FI1Fwf+OSYrp1Ua1ttAR7GDO7qLgBOOjW+h6yfKar18C1NKW
;;; WXTkqJ3jiPiw9bdTcRwHeB51tEBRA35YcxgqnA0eVds1rPxlmUuXZZGXOlMmHrXj
;;; j+NmOOKaUhxF2aDugJMbVTIDWTkc3fieS0gbBAumz4CUx0+VeSW827jK6dmsLykH
;;; weVS/6xMNJ8tpr+twXK7OC0oRMQ1Q/xBZObv6s7pravtLEA3MUbMoWUwYwYDVR0O
;;; MVwEWjQAMQA7ADEALwAzADAALwAyADAAMQA4AC8ANAAvADUAMQAvADMAOAAvAFQA
;;; aQBtAGUAIABmAHIAbwBtACAAdABoAGkAcwAgAGMAbwBtAHAAdQB0AGUAcgAAAA==
;;; -----END-SIGNATURE-----