// Navigation controller.
(function($) {
	$.widget('adsk.navigationcontroller', {
		options: {
            toc: undefined,
            index: undefined,
            targetId: 'navigation',
            searchPageId: 'search',
            defaultTab: 'toc',
            tabControllers: {},
            openedTabId: undefined,
            controllers: {
                indexDataLoader: undefined,
                favoritesController: undefined
            }
		},

		_view: undefined,

        _create: function() {
            console.log('navigationcontroller: _create');

            var selector = '#' + this.options.targetId;
            $(selector).navigationview({
                create:    $.proxy(this._viewCreateHandler, this),
                buttontap: $.proxy(this._viewButtontapHandler, this)
            });
        },

        _viewCreateHandler: function(event, ui) {
            console.log('navigationcontroller: _viewCreateHandler');

            this._view = $(event.target).navigationview("instance");

            this._createController(this.options.defaultTab);
        },

        _viewButtontapHandler: function(event, id) {
            console.log('navigationcontroller: _viewButtontapHandler');

            var id = id.substring('nav-'.length),
                handlerName = '_' + id + 'ButtontapHandler';

            this[handlerName](event, id);
        },

        _resumeButtontapHandler: function(event, id) {
            console.log('navigationcontroller: _resumeButtontapHandler');

            // Show previous opened page.
            this._backToPreviousPage()
        },

        _searchButtontapHandler: function(event, data) {
            console.log('navigationcontroller: _searchButtontapHandler');

            // Show search view.
            this._trigger('showpage', {}, {
                id: this.options.searchPageId
            });

            this._trigger('setsuggestiondata', {}, [this._getNavigationSearchData()]);
        },

        _tocButtontapHandler: function(event, id) {
            console.log('navigationcontroller: _tocButtontapHandler');

            this._createController(id);
        },

        _treeButtontapHandler: function(event, id) {
            console.log('navigationcontroller: _treeButtontapHandler');

            this._createController(id);
        },

        _indexButtontapHandler: function(event, id) {
            console.log('navigationcontroller: _indexButtontapHandler');

            this._createController(id);
        },

        _favoritesButtontapHandler: function(event, id) {
            console.log('navigationcontroller: _favoritesButtontapHandler');

            this._createController(id);
        },

        _backToPreviousPage: function() {
            console.log('navigationcontroller: _backToPreviousPage');

            this._trigger('back');
        },

        _getNavigationSearchData: function() {
            var suggestionData;
            var suggestionDataType;
            switch (this.options.openedTabId) {
                case 'toc':
                    suggestionData = this.options.toc;
                    suggestionDataType = 'toc';

                    break;
                case 'tree':
                    suggestionData = this.options.toc;
                    suggestionDataType = 'tree';

                    break;
                case 'index':
                    suggestionData = this.options.index;
                    suggestionDataType = 'index';

                    break;
                case 'favorites':
                    suggestionData = this.options.controllers.favoritesController.getListOfFavorites();
                    suggestionDataType = 'favorites';
                    break;
                default:
                    break;
            }

            return {
                data: suggestionData,
                type: suggestionDataType
            };
        },

        _createController: function(tabId) {
            console.log('navigationcontroller: _createController');

            this.options.openedTabId = tabId;
            var tabs = this.options.tabControllers;
            var controllers = this.options.controllers;

            switch(tabId) {
                case 'toc':
                    if (!tabs.tocTabController) {

                        tabs.tocTabController = $.adsk.toctabcontroller({
                            opentopic: $.proxy(this._openTopicHandler, this)
                        });
                    }
                    break;

                case 'tree':
                    if (!tabs.treeTabController) {

                        tabs.treeTabController = $.adsk.treetabcontroller({
                            opentopic: $.proxy(this._openTopicHandler, this)
                        });

                        tabs.treeTabController.setTocData(this.options.toc)
                    }
                    break;

                case 'index':
                    if (!tabs.indexTabController) {

                        tabs.indexTabController = $.adsk.indextabcontroller({
                            opentopic: $.proxy(this._openTopicHandler, this)
                        });

                        controllers.indexDataLoader = $.adsk.indexdataloader({
                            loaded: $.proxy(this._indexDataLoaded, this)
                        });

                        controllers.indexDataLoader.loadIndexData();
                    }
                    break;

                case 'favorites':
                    if (!tabs.favoritesTabController) {

                        tabs.favoritesTabController = $.adsk.favoritestabcontroller({
                            opentopic: $.proxy(this._openTopicHandler, this),
                            controllers: {
                                favoritesController: controllers.favoritesController
                            }
                        });
                    }
                    break;

                default:
                    break;
            }
        },

        _indexDataLoaded: function(event, data) {
            console.log('navigationcontroller: _indexDataLoaded');

            this.options.index = data.index;
            this.options.tabControllers.indexTabController.initIndexList(data.index);
        },

        _openTopicHandler: function(event, data) {
            console.log('navigationcontroller: _openTopicHandler');

            if($('#search-result.current').length !== 0){
                this._trigger('closepage', {}, 'search-result');
            }
            this._trigger('opentopic', {}, data);

            // Back to previous UI page.
            this._trigger('back');
        },

        refresh: function() {
            console.log('navigationcontroller: refresh');

            // Refresh tabs.
            $.each(this.options.tabControllers, function(index, controller) {
                if (controller.refresh) {
                    controller.refresh();
                }
            });
        },

        resize: function(data) {
            console.log('navigationcontroller: resize');

            // Navigation view resize.
            this._view.resize();

            // Resize all tabs.
            $.each(this.options.tabControllers, function(index, controller) {
                controller.resize(data);
            });
        },

        setTocData: function(data) {
            console.log('navigationcontroller: setTocData');

            this.options.toc = data;

            $.each(this.options.tabControllers, function(index, controller) {
                controller.setTocData(data);
            });
        }
    });
})(jQuery);
// SIG // Begin signature block
// SIG // MIIbQQYJKoZIhvcNAQcCoIIbMjCCGy4CAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // 6RVkDJA4yrsOTufa77NmfeSgWTkLArC08YESZqCyeeCg
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
// SIG // CxqTcdQmAsPAWiMxghCDMIIQfwIBATCBmTCBhDELMAkG
// SIG // A1UEBhMCVVMxHTAbBgNVBAoTFFN5bWFudGVjIENvcnBv
// SIG // cmF0aW9uMR8wHQYDVQQLExZTeW1hbnRlYyBUcnVzdCBO
// SIG // ZXR3b3JrMTUwMwYDVQQDEyxTeW1hbnRlYyBDbGFzcyAz
// SIG // IFNIQTI1NiBDb2RlIFNpZ25pbmcgQ0EgLSBHMgIQANMD
// SIG // Pwr2vEKYUg3AWz9ByzANBglghkgBZQMEAgEFAKB8MBAG
// SIG // CisGAQQBgjcCAQwxAjAAMBkGCSqGSIb3DQEJAzEMBgor
// SIG // BgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEE
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCCxWFd6/RHLRMzH
// SIG // P6xXij0JNIZwJYFWYMN5F8za26RuITANBgkqhkiG9w0B
// SIG // AQEFAASCAQC8xUGVmLUIgij+IyZ2hmcAaTyCaQaSD/67
// SIG // Y8x44zKsVwnJNgUSRYtVihvSBEqJnd3+U1zGeGSDpgEZ
// SIG // hhlzx1E/uxrz1R3UbJqbcsZpNFPKiOh0pDsFgJiW9ZDI
// SIG // st1+9VidQaVwYCKZnFvZ5k//ORsYuReGKsIwFRZwne0J
// SIG // xTxk4RFv45B7mQOuTa/zOUFjcd+QrGSjWayzmhdB+LB9
// SIG // wfhzFfyipGKZitiCoTjLjK7EvK5duDGgyyQYVFXMijj3
// SIG // xT944au71SgWUVwhQI0FTMOieHNqk5mY9uOCOa2wHZPi
// SIG // 5arINl65DVlH8uuWZ7rPk95tJrcznC9qrEZwAe83DUuL
// SIG // oYIOPDCCDjgGCisGAQQBgjcDAwExgg4oMIIOJAYJKoZI
// SIG // hvcNAQcCoIIOFTCCDhECAQMxDTALBglghkgBZQMEAgEw
// SIG // ggEOBgsqhkiG9w0BCRABBKCB/gSB+zCB+AIBAQYLYIZI
// SIG // AYb4RQEHFwMwMTANBglghkgBZQMEAgEFAAQgfidM0Uy1
// SIG // UoR4zBsfrH/QxzDWKlz3wZjzM77m8/Tr+QICFD05/iEl
// SIG // 8n5WjJUAWDrNVc/mmvTIGA8yMDE4MDExNjAyNTU1Mlow
// SIG // AwIBHqCBhqSBgzCBgDELMAkGA1UEBhMCVVMxHTAbBgNV
// SIG // BAoTFFN5bWFudGVjIENvcnBvcmF0aW9uMR8wHQYDVQQL
// SIG // ExZTeW1hbnRlYyBUcnVzdCBOZXR3b3JrMTEwLwYDVQQD
// SIG // EyhTeW1hbnRlYyBTSEEyNTYgVGltZVN0YW1waW5nIFNp
// SIG // Z25lciAtIEcyoIIKizCCBTgwggQgoAMCAQICEHsFsdRJ
// SIG // aFFE98mJ0pwZnRIwDQYJKoZIhvcNAQELBQAwgb0xCzAJ
// SIG // BgNVBAYTAlVTMRcwFQYDVQQKEw5WZXJpU2lnbiwgSW5j
// SIG // LjEfMB0GA1UECxMWVmVyaVNpZ24gVHJ1c3QgTmV0d29y
// SIG // azE6MDgGA1UECxMxKGMpIDIwMDggVmVyaVNpZ24sIElu
// SIG // Yy4gLSBGb3IgYXV0aG9yaXplZCB1c2Ugb25seTE4MDYG
// SIG // A1UEAxMvVmVyaVNpZ24gVW5pdmVyc2FsIFJvb3QgQ2Vy
// SIG // dGlmaWNhdGlvbiBBdXRob3JpdHkwHhcNMTYwMTEyMDAw
// SIG // MDAwWhcNMzEwMTExMjM1OTU5WjB3MQswCQYDVQQGEwJV
// SIG // UzEdMBsGA1UEChMUU3ltYW50ZWMgQ29ycG9yYXRpb24x
// SIG // HzAdBgNVBAsTFlN5bWFudGVjIFRydXN0IE5ldHdvcmsx
// SIG // KDAmBgNVBAMTH1N5bWFudGVjIFNIQTI1NiBUaW1lU3Rh
// SIG // bXBpbmcgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw
// SIG // ggEKAoIBAQC7WZ1ZVU+djHJdGoGi61XzsAGtPHGsMo8F
// SIG // a4aaJwAyl2pNyWQUSym7wtkpuS7sY7Phzz8LVpD4Yht+
// SIG // 66YH4t5/Xm1AONSRBudBfHkcy8utG7/YlZHz8O5s+K2W
// SIG // OS5/wSe4eDnFhKXt7a+Hjs6Nx23q0pi1Oh8eOZ3D9Jqo
// SIG // 9IThxNF8ccYGKbQ/5IMNJsN7CD5N+Qq3M0n/yjvU9bKb
// SIG // S+GImRr1wOkzFNbfx4Dbke7+vJJXcnf0zajM/gn1kze+
// SIG // lYhqxdz0sUvUzugJkV+1hHk1inisGTKPI8EyQRtZDqk+
// SIG // scz51ivvt9jk1R1tETqS9pPJnONI7rtTDtQ2l4Z4xaE3
// SIG // AgMBAAGjggF3MIIBczAOBgNVHQ8BAf8EBAMCAQYwEgYD
// SIG // VR0TAQH/BAgwBgEB/wIBADBmBgNVHSAEXzBdMFsGC2CG
// SIG // SAGG+EUBBxcDMEwwIwYIKwYBBQUHAgEWF2h0dHBzOi8v
// SIG // ZC5zeW1jYi5jb20vY3BzMCUGCCsGAQUFBwICMBkaF2h0
// SIG // dHBzOi8vZC5zeW1jYi5jb20vcnBhMC4GCCsGAQUFBwEB
// SIG // BCIwIDAeBggrBgEFBQcwAYYSaHR0cDovL3Muc3ltY2Qu
// SIG // Y29tMDYGA1UdHwQvMC0wK6ApoCeGJWh0dHA6Ly9zLnN5
// SIG // bWNiLmNvbS91bml2ZXJzYWwtcm9vdC5jcmwwEwYDVR0l
// SIG // BAwwCgYIKwYBBQUHAwgwKAYDVR0RBCEwH6QdMBsxGTAX
// SIG // BgNVBAMTEFRpbWVTdGFtcC0yMDQ4LTMwHQYDVR0OBBYE
// SIG // FK9j1sqjToVy4Ke8QfMpojh/gHViMB8GA1UdIwQYMBaA
// SIG // FLZ3+mlIR59TEtXC6gcydgfRlwcZMA0GCSqGSIb3DQEB
// SIG // CwUAA4IBAQB16rAt1TQZXDJF/g7h1E+meMFv1+rd3E/z
// SIG // ociBiPenjxXmQCmt5l30otlWZIRxMCrdHmEXZiBWBpgZ
// SIG // jV1x8viXvAn9HJFHyeLojQP7zJAv1gpsTjPs1rSTyEyQ
// SIG // Y0g5QCHE3dZuiZg8tZiX6KkGtwnJj1NXQZAv4R5NTtzK
// SIG // EHhsQm7wtsX4YVxS9U72a433Snq+8839A9fZ9gOoD+NT
// SIG // 9wp17MZ1LqpmhQSZt/gGV+HGDvbor9rsmxgfqrnjOgC/
// SIG // zoqUywHbnsc4uw9Sq9HjlANgCk2g/idtFDL8P5dA4b+Z
// SIG // idvkORS92uTTw+orWrOVWFUEfcea7CMDjYUq0v+uqWGB
// SIG // MIIFSzCCBDOgAwIBAgIQVFjyqtdB1kS8hKl7oJZS5jAN
// SIG // BgkqhkiG9w0BAQsFADB3MQswCQYDVQQGEwJVUzEdMBsG
// SIG // A1UEChMUU3ltYW50ZWMgQ29ycG9yYXRpb24xHzAdBgNV
// SIG // BAsTFlN5bWFudGVjIFRydXN0IE5ldHdvcmsxKDAmBgNV
// SIG // BAMTH1N5bWFudGVjIFNIQTI1NiBUaW1lU3RhbXBpbmcg
// SIG // Q0EwHhcNMTcwMTAyMDAwMDAwWhcNMjgwNDAxMjM1OTU5
// SIG // WjCBgDELMAkGA1UEBhMCVVMxHTAbBgNVBAoTFFN5bWFu
// SIG // dGVjIENvcnBvcmF0aW9uMR8wHQYDVQQLExZTeW1hbnRl
// SIG // YyBUcnVzdCBOZXR3b3JrMTEwLwYDVQQDEyhTeW1hbnRl
// SIG // YyBTSEEyNTYgVGltZVN0YW1waW5nIFNpZ25lciAtIEcy
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // mfP82AQJA4b511ymk8BCfOp8Y89dAOKO88CQ348p9Rjq
// SIG // lLeS5dewoHOB6OkKm0p8Af+dj6Q5pw7qRfQiDDpw7TlF
// SIG // i+TFG1zwRWhGJAVjdpsc/J5sKrFW5Yp/UnGu8jXVRiMG
// SIG // HM9ILR20zbjZdiOOHP8+v7sGXGkHpmUO+F6ufS7tTa41
// SIG // 78nXAEL9KJUOn11yQgm8w9pE0u3MR4Tk/MotrFi+rveu
// SIG // 2UQNCLfCd9YaQ3DRbgPeUpLEEAhx2boiVfIfvO2bnTvi
// SIG // Xh1Mg/+XD3sL51WDTtIN677X7K5uR7mf36XWUbwEVe3/
// SIG // J3BMye0qSxPhsblMD8kB7lVlX2kCeGbLPwIDAQABo4IB
// SIG // xzCCAcMwDAYDVR0TAQH/BAIwADBmBgNVHSAEXzBdMFsG
// SIG // C2CGSAGG+EUBBxcDMEwwIwYIKwYBBQUHAgEWF2h0dHBz
// SIG // Oi8vZC5zeW1jYi5jb20vY3BzMCUGCCsGAQUFBwICMBka
// SIG // F2h0dHBzOi8vZC5zeW1jYi5jb20vcnBhMEAGA1UdHwQ5
// SIG // MDcwNaAzoDGGL2h0dHA6Ly90cy1jcmwud3Muc3ltYW50
// SIG // ZWMuY29tL3NoYTI1Ni10c3MtY2EuY3JsMBYGA1UdJQEB
// SIG // /wQMMAoGCCsGAQUFBwMIMA4GA1UdDwEB/wQEAwIHgDB3
// SIG // BggrBgEFBQcBAQRrMGkwKgYIKwYBBQUHMAGGHmh0dHA6
// SIG // Ly90cy1vY3NwLndzLnN5bWFudGVjLmNvbTA7BggrBgEF
// SIG // BQcwAoYvaHR0cDovL3RzLWFpYS53cy5zeW1hbnRlYy5j
// SIG // b20vc2hhMjU2LXRzcy1jYS5jZXIwKAYDVR0RBCEwH6Qd
// SIG // MBsxGTAXBgNVBAMTEFRpbWVTdGFtcC0yMDQ4LTUwHQYD
// SIG // VR0OBBYEFAm1wf6WcpcpQ5rJ4AK6rvj9L7r2MB8GA1Ud
// SIG // IwQYMBaAFK9j1sqjToVy4Ke8QfMpojh/gHViMA0GCSqG
// SIG // SIb3DQEBCwUAA4IBAQAXswqI6VxaXiBrOwoVsmzFqYoy
// SIG // h9Ox9BxTroW+P5v/17y3lIW0x1J+lOi97WGy1KeZ5MPJ
// SIG // k8E1PQvoaApdVpi9sSI70UR617/wbVEyitUj3zgBN/bi
// SIG // Uyt6KxGPt01sejMDG3xrCZQXu+TbWNQhE2Xn7NElyix1
// SIG // mpx//Mm7KmirxH20z6PJbKfZxACciQp3kfRNovsxO4Zu
// SIG // 9uYfUAOGm7/LQqvmdptyWhEBisbvpW+V592uuuYiZfAY
// SIG // WRsRyc2At9iXRx9CCPiscR+wRlOz1LLVo6tQdUgSF4Kt
// SIG // z+BBTzJ+zZUcv5GKCD2kp2cClt8kTKXQQcCCYKOKFzJL
// SIG // 07zPpLSMMYICWjCCAlYCAQEwgYswdzELMAkGA1UEBhMC
// SIG // VVMxHTAbBgNVBAoTFFN5bWFudGVjIENvcnBvcmF0aW9u
// SIG // MR8wHQYDVQQLExZTeW1hbnRlYyBUcnVzdCBOZXR3b3Jr
// SIG // MSgwJgYDVQQDEx9TeW1hbnRlYyBTSEEyNTYgVGltZVN0
// SIG // YW1waW5nIENBAhBUWPKq10HWRLyEqXugllLmMAsGCWCG
// SIG // SAFlAwQCAaCBpDAaBgkqhkiG9w0BCQMxDQYLKoZIhvcN
// SIG // AQkQAQQwHAYJKoZIhvcNAQkFMQ8XDTE4MDExNjAyNTU1
// SIG // MlowLwYJKoZIhvcNAQkEMSIEIBnURp3ypu5PEXVp5hnj
// SIG // iI6efmZOhYm2Gm/hgDko2/a0MDcGCyqGSIb3DQEJEAIv
// SIG // MSgwJjAkMCIEIM96wXrQR+zV/cNoIgMbEtTvB4tvK0xe
// SIG // a6Qfj/LPS61nMAsGCSqGSIb3DQEBAQSCAQBbsTm9NdLu
// SIG // RlvbMkSoXavQJPhxAFHsqdjMTKeskWoGshxMopyeFTr4
// SIG // 2O8Y+crYJTlTvsOpBb2X6di9sbPYY+Io66zFfqqMVyb+
// SIG // iDWv15oGzU52XQ+XMv4uDveGzEmOaEllFJkK6VVH9U3Q
// SIG // JFYl/5cTgy4Ir1e01fHl/svv2a1GE7XzKm3Tza97ptrF
// SIG // xHWIUX/Z7+gtnW6V0YA7HnhO4vGUWG1E9suMrN7zKtVa
// SIG // D+dwXii2V3wWoEU//U6+HnEnrSzAYBZPwZAQxTfkfA3W
// SIG // tTmS6j+3OELL3cR+Qhfs04Vo4C4AGdsIpPlfUg//DZ9a
// SIG // CJb09gy4oIB65xrgeT2gszss
// SIG // End signature block
