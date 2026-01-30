// Mobile share view (in form of jQuery widget).
(function($) {
	$.widget('adsk.mobileshareview', {
        options: {
            data: undefined
        },

		_create: function() {
			// Render view.
			this._render();

			// Handle UI events.
            this._addEventHandlers();
		},

		_render: function() {
		    console.log('mobileshareview: _render');

		    // Create markup.
            this._initMobileSharePageSection();
            this._initMobileSharePageFooter();
		},

        _initMobileSharePageSection:function () {
            console.log('mobileshareview: _initMobileSharePageSection');

            this.shareMenu = $(document.createElement('div'))
                .attr('id','share-menu')
                .addClass('share-mobile-menu');
            this.shareMenuBackground = $(document.createElement('div'))
                .addClass('share-mobile-menu-background')
                .appendTo(this.element);
            this.shareMenu.appendTo(this.shareMenuBackground);
        },

        _initMobileSharePageFooter:function () {
            console.log('mobileshareview: _initMobileSharePageFooter');

            this.shareFooter = $(document.createElement('div'))
                .addClass('share-footer')
                .appendTo(this.element);
            this.shareFooterLink = $(document.createElement('a'))
                .attr('id','share-cancel-button').attr('href','#')
                .appendTo(this.shareFooter);
            this.shareFooterDiv = $(document.createElement('div'))
                .addClass('share-menu-button-width')
                .addClass('frame')
                .text('Cancel')
                .appendTo(this.shareFooterLink);
       },

        _addEventHandlers:function () {
            console.log('mobileshareview: _addEventHandlers');

            var self = this;

            $(this.shareFooterLink).on('touchstart', function (event) {
                self.shareFooterLink.addClass('tapped');
            });

            $(this.shareFooterLink).on('touchend', function (event) {
                self.shareFooterLink.removeClass('tapped');
                self._cancelButtonTogglerClick(event, {});
            });
        },

        _cancelButtonTogglerClick: function(event) {
            console.log('mobileshareview: _cancelButtonTogglerClick');
			this._trigger('cancel', event, {});
		},

        getFooterOffset: function() {
            console.log('mobileshareview: getFooterOffset');
            return this.shareFooter;
        }

    });
})(jQuery);
// SIG // Begin signature block
// SIG // MIIbQgYJKoZIhvcNAQcCoIIbMzCCGy8CAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // LzsE1eC7L2OqMsdXAKlMPTobobrSLP368HI/2pL+BMKg
// SIG // ggoWMIIExzCCA6+gAwIBAgIQANMDPwr2vEKYUg3AWz9B
// SIG // yzANBgkqhkiG9w0BAQsFADCBhDELMAkGA1UEBhMCVVMx
// SIG // HTAbBgNVBAoTFFN5bWFudGVjIENvcnBvcmF0aW9uMR8w
// SIG // HQYDVQQLExZTeW1hbnRlYyBUcnVzdCBOZXR3b3JrMTUw
// SIG // MwYDVQQDEyxTeW1hbnRlYyBDbGFzcyAzIFNIQTI1NiBD
// SIG // b2RlIFNpZ25pbmcgQ0EgLSBHMjAeFw0xNzA2MjAwMDAw
// SIG // MDBaFw0xODA2MjAyMzU5NTlaMHgxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIDApDYWxpZm9ybmlhMRMwEQYDVQQHDApT
// SIG // YW4gUmFmYWVsMRcwFQYDVQQKDA5BdXRvZGVzaywgSW5j
// SIG // LjENMAsGA1UECwwESVNSQzEXMBUGA1UEAwwOQXV0b2Rl
// SIG // c2ssIEluYy4wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw
// SIG // ggEKAoIBAQDEm0ybXlDjakGjfPJQOz8JJyQPZ4frwCIk
// SIG // YuGOWfv+3NZI9Snuy2rQ00G3NuUtmIl0Y0MeypzK5A8s
// SIG // nDGR+bkcRvGn2OmMHS50aggKjsao+rCNMiC8btSwxojg
// SIG // ekzX093J9+/kauZtUESeku1KV2xsBhQ+KTc5TliNgJDJ
// SIG // kB8VW+i2bK0oVx4aMPjX8pivLnbZDYo48U5lQNJtKVBC
// SIG // tnfv0wz2QfRAvXARUxGAnn7xsdgQzYzV6wn+i6N/fMDl
// SIG // e+qWfumXUFSnueYpP85Yi3oNu5kFydgeu34/TTkF1+gD
// SIG // OXfEKLP3cInMUgL7EGTIzHlXaumXFVZobx75J77kq721
// SIG // AgMBAAGjggE+MIIBOjAJBgNVHRMEAjAAMA4GA1UdDwEB
// SIG // /wQEAwIHgDATBgNVHSUEDDAKBggrBgEFBQcDAzBhBgNV
// SIG // HSAEWjBYMFYGBmeBDAEEATBMMCMGCCsGAQUFBwIBFhdo
// SIG // dHRwczovL2Quc3ltY2IuY29tL2NwczAlBggrBgEFBQcC
// SIG // AjAZDBdodHRwczovL2Quc3ltY2IuY29tL3JwYTAfBgNV
// SIG // HSMEGDAWgBTUwAYiSes5S92T4lyhuEd2CXIDWDArBgNV
// SIG // HR8EJDAiMCCgHqAchhpodHRwOi8vcmIuc3ltY2IuY29t
// SIG // L3JiLmNybDBXBggrBgEFBQcBAQRLMEkwHwYIKwYBBQUH
// SIG // MAGGE2h0dHA6Ly9yYi5zeW1jZC5jb20wJgYIKwYBBQUH
// SIG // MAKGGmh0dHA6Ly9yYi5zeW1jYi5jb20vcmIuY3J0MA0G
// SIG // CSqGSIb3DQEBCwUAA4IBAQApMpNskUmvqk2ygWaCDz+3
// SIG // PTZOZl8Q1FKIoGnv2+iq6wblFUCZt+KgKKyoZoHX6GMd
// SIG // Z/YKeTi5PO4QpKQBgm82kOtKVOdUnRXhUderqaAGrX8W
// SIG // qmXjggda1kRud5e+mdcql+RV1A+RVjjVmSATbeXCC0H5
// SIG // mfvO4o5lnBOfkOQeqKxRjWdEhklOszd+1pQVFX761VyA
// SIG // GfXgr0Jtm9dptQBU1TPybl3+ypIV00IldfMGj1VOKZtd
// SIG // ZrgMiXrdaIWOqRhSEyDdQWvqGzTZm7x5elhF3vcGkRZb
// SIG // 1XqtS7OgDJ7wW0z28NMLA9yfFsPFfOQfMBEEgoCc01P9
// SIG // MBPyiz1XO28kMIIFRzCCBC+gAwIBAgIQfBs1NUrn23Tn
// SIG // QV8RacprqDANBgkqhkiG9w0BAQsFADCBvTELMAkGA1UE
// SIG // BhMCVVMxFzAVBgNVBAoTDlZlcmlTaWduLCBJbmMuMR8w
// SIG // HQYDVQQLExZWZXJpU2lnbiBUcnVzdCBOZXR3b3JrMTow
// SIG // OAYDVQQLEzEoYykgMjAwOCBWZXJpU2lnbiwgSW5jLiAt
// SIG // IEZvciBhdXRob3JpemVkIHVzZSBvbmx5MTgwNgYDVQQD
// SIG // Ey9WZXJpU2lnbiBVbml2ZXJzYWwgUm9vdCBDZXJ0aWZp
// SIG // Y2F0aW9uIEF1dGhvcml0eTAeFw0xNDA3MjIwMDAwMDBa
// SIG // Fw0yNDA3MjEyMzU5NTlaMIGEMQswCQYDVQQGEwJVUzEd
// SIG // MBsGA1UEChMUU3ltYW50ZWMgQ29ycG9yYXRpb24xHzAd
// SIG // BgNVBAsTFlN5bWFudGVjIFRydXN0IE5ldHdvcmsxNTAz
// SIG // BgNVBAMTLFN5bWFudGVjIENsYXNzIDMgU0hBMjU2IENv
// SIG // ZGUgU2lnbmluZyBDQSAtIEcyMIIBIjANBgkqhkiG9w0B
// SIG // AQEFAAOCAQ8AMIIBCgKCAQEA15VD1NzfZ645+1KktiYx
// SIG // BHDpt45bKro3aTWVj7vAMOeG2HO73+vRdj+KVo7rLUvw
// SIG // VxhOsY2lM9MLdSPVankn3aPT9w6HZbXerRzx9TW0IlGv
// SIG // IqHBXUuQf8BZTqudeakC1x5JsTtNh/7CeKu/71KunK8I
// SIG // 2TnlmlE+aV8wEE5xY2xY4fAgMxsPdL5byxLh24zEgJRy
// SIG // u/ZFmp7BJQv7oxye2KYJcHHswEdMj33D3hnOPu4Eco4X
// SIG // 0//wsgUyGUzTsByf/qV4IEJwQbAmjG8AyDoAEUF6QbCn
// SIG // ipEEoJl49He082Aq5mxQBLcUYP8NUfSoi4T+IdpcXn31
// SIG // KXlPsER0b21y/wIDAQABo4IBeDCCAXQwLgYIKwYBBQUH
// SIG // AQEEIjAgMB4GCCsGAQUFBzABhhJodHRwOi8vcy5zeW1j
// SIG // ZC5jb20wEgYDVR0TAQH/BAgwBgEB/wIBADBmBgNVHSAE
// SIG // XzBdMFsGC2CGSAGG+EUBBxcDMEwwIwYIKwYBBQUHAgEW
// SIG // F2h0dHBzOi8vZC5zeW1jYi5jb20vY3BzMCUGCCsGAQUF
// SIG // BwICMBkaF2h0dHBzOi8vZC5zeW1jYi5jb20vcnBhMDYG
// SIG // A1UdHwQvMC0wK6ApoCeGJWh0dHA6Ly9zLnN5bWNiLmNv
// SIG // bS91bml2ZXJzYWwtcm9vdC5jcmwwEwYDVR0lBAwwCgYI
// SIG // KwYBBQUHAwMwDgYDVR0PAQH/BAQDAgEGMCkGA1UdEQQi
// SIG // MCCkHjAcMRowGAYDVQQDExFTeW1hbnRlY1BLSS0xLTcy
// SIG // NDAdBgNVHQ4EFgQU1MAGIknrOUvdk+JcobhHdglyA1gw
// SIG // HwYDVR0jBBgwFoAUtnf6aUhHn1MS1cLqBzJ2B9GXBxkw
// SIG // DQYJKoZIhvcNAQELBQADggEBAH/ryqfqi3ZC6z6OIFQw
// SIG // 47e53PpIPhbHD0WVEM0nhqNm8wLtcfiqwlWXkXCD+VJ+
// SIG // Umk8yfHglEaAGLuh1KRWpvMdAJHVhvNIh+DLxDRoIF60
// SIG // y/kF7ZyvcFMnueg+flGgaXGL3FHtgDolMp9Er25DKNMh
// SIG // dbuX2IuLjP6pBEYEhfcVnEsRjcQsF/7Vbn+a4laS8Zaz
// SIG // rS359N/aiZnOsjhEwPdHe8olufoqaDObUHLeqJ/UzSwL
// SIG // NL2LMHhA4I2OJxuQbxq+CBWBXesv4lHnUR7JeCnnHmW/
// SIG // OO8BSgEJJA4WxBR5wUE3NNA9kVKUneFo7wjw4mmcZ26Q
// SIG // CxqTcdQmAsPAWiMxghCEMIIQgAIBATCBmTCBhDELMAkG
// SIG // A1UEBhMCVVMxHTAbBgNVBAoTFFN5bWFudGVjIENvcnBv
// SIG // cmF0aW9uMR8wHQYDVQQLExZTeW1hbnRlYyBUcnVzdCBO
// SIG // ZXR3b3JrMTUwMwYDVQQDEyxTeW1hbnRlYyBDbGFzcyAz
// SIG // IFNIQTI1NiBDb2RlIFNpZ25pbmcgQ0EgLSBHMgIQANMD
// SIG // Pwr2vEKYUg3AWz9ByzANBglghkgBZQMEAgEFAKB8MBAG
// SIG // CisGAQQBgjcCAQwxAjAAMBkGCSqGSIb3DQEJAzEMBgor
// SIG // BgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEE
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCCIhJMtEZan0nTR
// SIG // mwcR0HE3z6TlnHlIf21jRglY8jdHajANBgkqhkiG9w0B
// SIG // AQEFAASCAQAGPILSrX/a97wVDw4wWOOdUO6WKBnUWi+h
// SIG // l2PB1pUkGTvySva71yDIYldi3dFJrFCbXDQE1TPU2Wk1
// SIG // AHGju7BcElj6Ph5BH1Q3vRuC0b72+D+pGxXPRaNJOGJL
// SIG // YB2ZAzC9D4uXdyp0FN4EVhNPRXuQdg2DwvtDeUFMjz6P
// SIG // 8amyPzRidJ3txaIsuoVa2lt18PO4FQB1lmt3cDfoBRUE
// SIG // Nwcq3sFJXUFuwkPK8/h1dMqNL7v6LsYec8A9dTahTyL6
// SIG // K5kzQ24LhDluPXLkg3cx1OMwURaV0K3E2RR6osPGkL1A
// SIG // a5SGUhGwOR2Wg41DMkPWPovtjBIOpmcW4ydPc9ro29P3
// SIG // oYIOPTCCDjkGCisGAQQBgjcDAwExgg4pMIIOJQYJKoZI
// SIG // hvcNAQcCoIIOFjCCDhICAQMxDTALBglghkgBZQMEAgEw
// SIG // ggEPBgsqhkiG9w0BCRABBKCB/wSB/DCB+QIBAQYLYIZI
// SIG // AYb4RQEHFwMwMTANBglghkgBZQMEAgEFAAQgpCjReH0r
// SIG // CudvG2r/7uds2pbnkGFKjZMWLUz9eTAWFKECFQDdJPxg
// SIG // wkJSehdJRDY8UXLzRTIcZBgPMjAxODAxMTYwMjU1NTVa
// SIG // MAMCAR6ggYakgYMwgYAxCzAJBgNVBAYTAlVTMR0wGwYD
// SIG // VQQKExRTeW1hbnRlYyBDb3Jwb3JhdGlvbjEfMB0GA1UE
// SIG // CxMWU3ltYW50ZWMgVHJ1c3QgTmV0d29yazExMC8GA1UE
// SIG // AxMoU3ltYW50ZWMgU0hBMjU2IFRpbWVTdGFtcGluZyBT
// SIG // aWduZXIgLSBHMqCCCoswggU4MIIEIKADAgECAhB7BbHU
// SIG // SWhRRPfJidKcGZ0SMA0GCSqGSIb3DQEBCwUAMIG9MQsw
// SIG // CQYDVQQGEwJVUzEXMBUGA1UEChMOVmVyaVNpZ24sIElu
// SIG // Yy4xHzAdBgNVBAsTFlZlcmlTaWduIFRydXN0IE5ldHdv
// SIG // cmsxOjA4BgNVBAsTMShjKSAyMDA4IFZlcmlTaWduLCBJ
// SIG // bmMuIC0gRm9yIGF1dGhvcml6ZWQgdXNlIG9ubHkxODA2
// SIG // BgNVBAMTL1ZlcmlTaWduIFVuaXZlcnNhbCBSb290IENl
// SIG // cnRpZmljYXRpb24gQXV0aG9yaXR5MB4XDTE2MDExMjAw
// SIG // MDAwMFoXDTMxMDExMTIzNTk1OVowdzELMAkGA1UEBhMC
// SIG // VVMxHTAbBgNVBAoTFFN5bWFudGVjIENvcnBvcmF0aW9u
// SIG // MR8wHQYDVQQLExZTeW1hbnRlYyBUcnVzdCBOZXR3b3Jr
// SIG // MSgwJgYDVQQDEx9TeW1hbnRlYyBTSEEyNTYgVGltZVN0
// SIG // YW1waW5nIENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
// SIG // MIIBCgKCAQEAu1mdWVVPnYxyXRqBoutV87ABrTxxrDKP
// SIG // BWuGmicAMpdqTclkFEspu8LZKbku7GOz4c8/C1aQ+GIb
// SIG // fuumB+Lef15tQDjUkQbnQXx5HMvLrRu/2JWR8/DubPit
// SIG // ljkuf8EnuHg5xYSl7e2vh47Ojcdt6tKYtTofHjmdw/Sa
// SIG // qPSE4cTRfHHGBim0P+SDDSbDewg+TfkKtzNJ/8o71PWy
// SIG // m0vhiJka9cDpMxTW38eA25Hu/rySV3J39M2ozP4J9ZM3
// SIG // vpWIasXc9LFL1M7oCZFftYR5NYp4rBkyjyPBMkEbWQ6p
// SIG // PrHM+dYr77fY5NUdbRE6kvaTyZzjSO67Uw7UNpeGeMWh
// SIG // NwIDAQABo4IBdzCCAXMwDgYDVR0PAQH/BAQDAgEGMBIG
// SIG // A1UdEwEB/wQIMAYBAf8CAQAwZgYDVR0gBF8wXTBbBgtg
// SIG // hkgBhvhFAQcXAzBMMCMGCCsGAQUFBwIBFhdodHRwczov
// SIG // L2Quc3ltY2IuY29tL2NwczAlBggrBgEFBQcCAjAZGhdo
// SIG // dHRwczovL2Quc3ltY2IuY29tL3JwYTAuBggrBgEFBQcB
// SIG // AQQiMCAwHgYIKwYBBQUHMAGGEmh0dHA6Ly9zLnN5bWNk
// SIG // LmNvbTA2BgNVHR8ELzAtMCugKaAnhiVodHRwOi8vcy5z
// SIG // eW1jYi5jb20vdW5pdmVyc2FsLXJvb3QuY3JsMBMGA1Ud
// SIG // JQQMMAoGCCsGAQUFBwMIMCgGA1UdEQQhMB+kHTAbMRkw
// SIG // FwYDVQQDExBUaW1lU3RhbXAtMjA0OC0zMB0GA1UdDgQW
// SIG // BBSvY9bKo06FcuCnvEHzKaI4f4B1YjAfBgNVHSMEGDAW
// SIG // gBS2d/ppSEefUxLVwuoHMnYH0ZcHGTANBgkqhkiG9w0B
// SIG // AQsFAAOCAQEAdeqwLdU0GVwyRf4O4dRPpnjBb9fq3dxP
// SIG // 86HIgYj3p48V5kApreZd9KLZVmSEcTAq3R5hF2YgVgaY
// SIG // GY1dcfL4l7wJ/RyRR8ni6I0D+8yQL9YKbE4z7Na0k8hM
// SIG // kGNIOUAhxN3WbomYPLWYl+ipBrcJyY9TV0GQL+EeTU7c
// SIG // yhB4bEJu8LbF+GFcUvVO9muN90p6vvPN/QPX2fYDqA/j
// SIG // U/cKdezGdS6qZoUEmbf4Blfhxg726K/a7JsYH6q54zoA
// SIG // v86KlMsB257HOLsPUqvR45QDYApNoP4nbRQy/D+XQOG/
// SIG // mYnb5DkUvdrk08PqK1qzlVhVBH3HmuwjA42FKtL/rqlh
// SIG // gTCCBUswggQzoAMCAQICEFRY8qrXQdZEvISpe6CWUuYw
// SIG // DQYJKoZIhvcNAQELBQAwdzELMAkGA1UEBhMCVVMxHTAb
// SIG // BgNVBAoTFFN5bWFudGVjIENvcnBvcmF0aW9uMR8wHQYD
// SIG // VQQLExZTeW1hbnRlYyBUcnVzdCBOZXR3b3JrMSgwJgYD
// SIG // VQQDEx9TeW1hbnRlYyBTSEEyNTYgVGltZVN0YW1waW5n
// SIG // IENBMB4XDTE3MDEwMjAwMDAwMFoXDTI4MDQwMTIzNTk1
// SIG // OVowgYAxCzAJBgNVBAYTAlVTMR0wGwYDVQQKExRTeW1h
// SIG // bnRlYyBDb3Jwb3JhdGlvbjEfMB0GA1UECxMWU3ltYW50
// SIG // ZWMgVHJ1c3QgTmV0d29yazExMC8GA1UEAxMoU3ltYW50
// SIG // ZWMgU0hBMjU2IFRpbWVTdGFtcGluZyBTaWduZXIgLSBH
// SIG // MjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB
// SIG // AJnz/NgECQOG+ddcppPAQnzqfGPPXQDijvPAkN+PKfUY
// SIG // 6pS3kuXXsKBzgejpCptKfAH/nY+kOacO6kX0Igw6cO05
// SIG // RYvkxRtc8EVoRiQFY3abHPyebCqxVuWKf1JxrvI11UYj
// SIG // BhzPSC0dtM242XYjjhz/Pr+7BlxpB6ZlDvhern0u7U2u
// SIG // Ne/J1wBC/SiVDp9dckIJvMPaRNLtzEeE5PzKLaxYvq73
// SIG // rtlEDQi3wnfWGkNw0W4D3lKSxBAIcdm6IlXyH7ztm507
// SIG // 4l4dTIP/lw97C+dVg07SDeu+1+yubke5n9+l1lG8BFXt
// SIG // /ydwTMntKksT4bG5TA/JAe5VZV9pAnhmyz8CAwEAAaOC
// SIG // AccwggHDMAwGA1UdEwEB/wQCMAAwZgYDVR0gBF8wXTBb
// SIG // BgtghkgBhvhFAQcXAzBMMCMGCCsGAQUFBwIBFhdodHRw
// SIG // czovL2Quc3ltY2IuY29tL2NwczAlBggrBgEFBQcCAjAZ
// SIG // GhdodHRwczovL2Quc3ltY2IuY29tL3JwYTBABgNVHR8E
// SIG // OTA3MDWgM6Axhi9odHRwOi8vdHMtY3JsLndzLnN5bWFu
// SIG // dGVjLmNvbS9zaGEyNTYtdHNzLWNhLmNybDAWBgNVHSUB
// SIG // Af8EDDAKBggrBgEFBQcDCDAOBgNVHQ8BAf8EBAMCB4Aw
// SIG // dwYIKwYBBQUHAQEEazBpMCoGCCsGAQUFBzABhh5odHRw
// SIG // Oi8vdHMtb2NzcC53cy5zeW1hbnRlYy5jb20wOwYIKwYB
// SIG // BQUHMAKGL2h0dHA6Ly90cy1haWEud3Muc3ltYW50ZWMu
// SIG // Y29tL3NoYTI1Ni10c3MtY2EuY2VyMCgGA1UdEQQhMB+k
// SIG // HTAbMRkwFwYDVQQDExBUaW1lU3RhbXAtMjA0OC01MB0G
// SIG // A1UdDgQWBBQJtcH+lnKXKUOayeACuq74/S+69jAfBgNV
// SIG // HSMEGDAWgBSvY9bKo06FcuCnvEHzKaI4f4B1YjANBgkq
// SIG // hkiG9w0BAQsFAAOCAQEAF7MKiOlcWl4gazsKFbJsxamK
// SIG // MofTsfQcU66Fvj+b/9e8t5SFtMdSfpTove1hstSnmeTD
// SIG // yZPBNT0L6GgKXVaYvbEiO9FEete/8G1RMorVI984ATf2
// SIG // 4lMreisRj7dNbHozAxt8awmUF7vk21jUIRNl5+zRJcos
// SIG // dZqcf/zJuypoq8R9tM+jyWyn2cQAnIkKd5H0TaL7MTuG
// SIG // bvbmH1ADhpu/y0Kr5nabcloRAYrG76VvlefdrrrmImXw
// SIG // GFkbEcnNgLfYl0cfQgj4rHEfsEZTs9Sy1aOrUHVIEheC
// SIG // rc/gQU8yfs2VHL+Rigg9pKdnApbfJEyl0EHAgmCjihcy
// SIG // S9O8z6S0jDGCAlowggJWAgEBMIGLMHcxCzAJBgNVBAYT
// SIG // AlVTMR0wGwYDVQQKExRTeW1hbnRlYyBDb3Jwb3JhdGlv
// SIG // bjEfMB0GA1UECxMWU3ltYW50ZWMgVHJ1c3QgTmV0d29y
// SIG // azEoMCYGA1UEAxMfU3ltYW50ZWMgU0hBMjU2IFRpbWVT
// SIG // dGFtcGluZyBDQQIQVFjyqtdB1kS8hKl7oJZS5jALBglg
// SIG // hkgBZQMEAgGggaQwGgYJKoZIhvcNAQkDMQ0GCyqGSIb3
// SIG // DQEJEAEEMBwGCSqGSIb3DQEJBTEPFw0xODAxMTYwMjU1
// SIG // NTVaMC8GCSqGSIb3DQEJBDEiBCC/MdWS+45m0p7pgN9z
// SIG // t7IaN3d6uEUU4i/HIn/c2Q95KjA3BgsqhkiG9w0BCRAC
// SIG // LzEoMCYwJDAiBCDPesF60Efs1f3DaCIDGxLU7weLbytM
// SIG // XmukH4/yz0utZzALBgkqhkiG9w0BAQEEggEAJKezTb2i
// SIG // jEmuQBL6/tiF0ZdmjC81WvPvcV8xAz0aRv08wIFdOYXV
// SIG // LDIM/WAjTkCQwdiErio9DnSClSj9uSt4T0InTvW7lDXJ
// SIG // JHuCvmEbwbbfdnzTlHMQ7j1chbci3ETX9yUajyx84l/B
// SIG // ubdV0DWeWE3S19AFEpvEUIkMNDYaDcTlkThAv2QQm/Im
// SIG // t050vM8IrXl0sKyDlIRkHve5D9jhgIHEj/Sh5Sbg7oac
// SIG // vUMA/RsE1FpXZ6L6G+R39BGp+IM2AvdFLw/nlenwM3rv
// SIG // L2QD2R3v5snM0CbUqFUJHikLPUfNcHyndyDIgR5Cx7GH
// SIG // JLKbbl65HQtXFvRgh7BFY8nmwA==
// SIG // End signature block
