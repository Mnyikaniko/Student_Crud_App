// Search view (jQuery UI widget).
(function($) {
	$.widget('adsk.searchview', {
		options: {

		},

		$toolbar:       undefined,
		$input:         undefined,
		$content:       undefined,
		$suggestions:   undefined,

		/* Private memebers. */

		_create: function() {
            console.log('searchview: _create');

			// Render view.
			this._render();
			
			// Handle UI events.
			this._addEventHandlers();

		},
		
		_render: function() {
            console.log('searchview: _render');

            // Create markup.
            this.element
            .html([ '<header class="toolbar drop-shadow">',
                        '<div class="column left">',
                            '<a href="#" id="search-context" class="button tab left active">',
                                '<div class="frame">',
                                    '<div class="context icon"></div>',
                                '</div>',
                            '</a>',
                            '<a href="#" id="search-beehive" class="button tab right">',
                                '<div class="frame">' +
                                    '<div class="beehive icon"></div>',
                                '</div>',
                            '</a>',
                        '</div>',

                        '<div class="column center">',
                            '<div class="search-query">',
                                '<button type="button" id="search-button" class="search button icon" tabindex="-1"></button>',
                                '<input type="search" placeholder="Search..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" id="search-query" class="search" name="q" value=""/>',
                            '</div>',
                        '</div>',

                        '<div class="column right">',
                            '<a href="#" id="search-cancel" class="button command">',
                                '<div class="frame">Cancel</div>',
                            '</a>',
                        '</div>',
                    '</header>',

                    '<div class="content">',
                        '<div id="tab-context" class="content-tab opened">',
                            '<div id="suggestion-view"></div>',
                        '</div>',
                        '<div id="tab-beehive" class="content-tab"></div>',
                    '</div>' ].join(''));

            // Cache jQuery objects for later use.
            this.$toolbar       = this.element.find('.toolbar');
            this.$input         = this.$toolbar.find('#search-query');
            this.$button        = this.$toolbar.find('button');
            this.$content       = this.element.find('.content');
            this.$suggestions   = this.$content.find('#suggestion-view');
		},

		_addEventHandlers: function() {
            console.log('searchview: _addEventHandlers');

            // Add toolbar buttons event handlers.
            this.$toolbar.find('.button')
                .on('touchstart', $.proxy(this._handleToolbarButtonTouchstart, this))
                .on('touchend', $.proxy(this._handleToolbarButtonTouchend, this));

            // Add search input field event handlers.
            this.$input.on('focusin', $.proxy(this._handleSearchInputFocusIn, this));
            this.$input.on('keyup', $.proxy(this._handleSearchInputKeyup, this));
        },

		_handleToolbarButtonTouchstart: function(event) {
		    console.log('searchview: _handleToolbarButtonTouchstart');

		    event.preventDefault();
            event.stopPropagation();

            // Highlight tapped button.
            $(event.delegateTarget).addClass("tapped");
		},

		_handleToolbarButtonTouchend: function(event) {
		    console.log('searchview: _handleToolbarButtonTouchend');

		    event.preventDefault();
            event.stopPropagation();

            var $button = $(event.delegateTarget),
                buttonId = $button.attr('id');

            if (buttonId === 'search-cancel'){
                this._trigger('clearelementvalue', event, this.$input);
                this._trigger('clearsuggestions', event);
            } else if ($button.hasClass('tab') && !($button.hasClass('active'))) {
                // Process tap on tab button.
                var tabId = buttonId.substring('search-'.length);
                this.openTabById(tabId);
            } else if (buttonId === 'search-button') {
                var target = this.$input.get(0);

                this._handleSubmitSearchForm(event, target);
            }

            // Remove button highlight.
            $button.removeClass('tapped');

            // Trigger 'buttontap' custom event.
            this._trigger('buttontap', event, $button.attr('id'));
		},

        _handleSubmitSearchForm: function(event, target) {
            console.log('searchview: _handleSubmitSearchForm');
            var searchTerm = target.value;

            target.blur();
            this._trigger('clearelementvalue', event, target);
            this._trigger('clearsuggestions', event);
            this._trigger('submitsearchform', event, {term:searchTerm})
        },

        _handleSearchInputFocusIn: function(event) {
		    console.log('searchview: _handleSearchInputFocusIn');

            event.stopPropagation();
            event.preventDefault();
            event.target.focus();
		},

		_handleSearchInputKeyup: function(event) {
		    console.log('searchview: _handleSearchInputKeyup');
            event.stopPropagation();
            event.preventDefault();

            var target = event.target,
                keyCode = event.keyCode,
                searchTerm = target.value;

            if(keyCode == 13){
                this._handleSubmitSearchForm(event, target);
            } else{
                if (searchTerm.length >= 1) {
                    this._trigger('loadsuggestion', event, searchTerm);
                } else{
                    this._trigger('clearsuggestions', event);
                }
            }
		},

        /* Public members. */

        changeSearchValue: function(searchTerm){
            console.log('searchview: changeSearchValue');

            var event;
            this.$input.val(searchTerm);
            if (searchTerm.length >= 1) {
                this._trigger('loadsuggestion', event, searchTerm);
            }
            this.$input.focus();
        },

        openTabById: function(tabId) {
            console.log('searchview: openTabById: ' + tabId);

            // Deactivate previous selected tab button.
            $(this.element).find('.active').removeClass('active');

            // Activate selected tab button.
            var $tabButton = $(this.element).find('#search-' + tabId);
            $tabButton.addClass('active');

            // Hide previous tab.
            $(this.element).find('.opened').removeClass('opened');

            // Show current tab.
            var $tabContent = $(this.element).find('#tab-' + tabId);
            $tabContent.addClass('opened');
        },

        resize: function() {
            console.log('searchview: resize');

            // Set content container height.
            var height = this.document.height() - this.$toolbar.height();
            this.$content.css('height', height + 'px');
        },

        createBeehiveSearchPanel: function() {
            console.log('searchview: _beehiveSearchFrameworkInitHandler');

            new SearchPanel({
                target: $('#tab-beehive'),

                ready: function(element) {
                    var component = this;

                    component.evt.on('itemSelected', function(data) {
                        var url;

                        if (data.caasurl) {
                            url = "caas.html?" + $.param({
                                url:    data.caasurl,
                                l:      Boot.Config.meta.language
                            });
                        } else if (data.url) {
                            url = data.url;
                            var parsedURL = URI.parse(url);

                            if (parsedURL.host === "www.youtube.com" && parsedURL.queryKey.v) {
                                url = "http://www.youtube.com/embed/" + parsedURL.queryKey.v;
                            }
                        }

                        if (url) {
                            window.open(url, '_blank');
                        }
                    });

                    component.evt.on('searchComplete', function() {
                        console.log('searchComplete');
                        component.content.searchResults.selectFromIndex(0);
                    });

                    component.contentReady.done(function() {
                        var uri = URI.parse(window.location.href);

                        if (uri.queryKey.query) {
                            $(element).find('.query input').val(uri.queryKey.query);
                            component.doSearch();
                        }
                    });
                }
            });
        }

	});
})(jQuery);
// SIG // Begin signature block
// SIG // MIIbQgYJKoZIhvcNAQcCoIIbMzCCGy8CAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // qTl4XAmF2csIg8ziUMI73VFfhgY40NcNddHjrNWz4KCg
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
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCCSClSnMlkjR3DD
// SIG // eGvjmtifuPBJdmkLwL1cnRFkU/dpwDANBgkqhkiG9w0B
// SIG // AQEFAASCAQAwpGiRJP6DMGANIKe4JPMOFX8E1R5da/NW
// SIG // +mAVFRK7MVo8jcdj9k7xzgK7dMaiwO0CSf7+ZQPFDdA7
// SIG // PQjibZp0hE8U9sZFpy5KWm2Fw9946220q04iDbuAxPHv
// SIG // Q2a9CS18HrkvGx9xUAa9QEAZFpeWItxM5kxaE2ugdpZy
// SIG // TP9/qT4mOfLDwnT8bHDOfISO6mS9ItENvQQatJcxZQo/
// SIG // nQSUgC+divMI+jg2Fa3rFgHg/1cyFO/KzZyQ75+tGige
// SIG // 6mlW/CA79qsLPGq5B0njs3M61AlpW/ImlSK4JA8OKLfe
// SIG // 8E4uBM2BLANXViVTxQSUZPHkz5CE8Z01ShGxU69nwsOZ
// SIG // oYIOPTCCDjkGCisGAQQBgjcDAwExgg4pMIIOJQYJKoZI
// SIG // hvcNAQcCoIIOFjCCDhICAQMxDTALBglghkgBZQMEAgEw
// SIG // ggEPBgsqhkiG9w0BCRABBKCB/wSB/DCB+QIBAQYLYIZI
// SIG // AYb4RQEHFwMwMTANBglghkgBZQMEAgEFAAQghUpdw5Fu
// SIG // WxeZFcyF1S6+i5qgujhBu4Zqfj7mrB+1j9MCFQCJxrKl
// SIG // SqNsQfcMNN11HcgVTET44RgPMjAxODAxMTYwMjU0MzVa
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
// SIG // DQEJEAEEMBwGCSqGSIb3DQEJBTEPFw0xODAxMTYwMjU0
// SIG // MzVaMC8GCSqGSIb3DQEJBDEiBCDEhEOOrE5JduIlr5X+
// SIG // BFYeOT2c6dkz2Sxl0SU242h64zA3BgsqhkiG9w0BCRAC
// SIG // LzEoMCYwJDAiBCDPesF60Efs1f3DaCIDGxLU7weLbytM
// SIG // XmukH4/yz0utZzALBgkqhkiG9w0BAQEEggEAiLJAn0zz
// SIG // 6cPUBToqmhItj7rjvLj1lWHEzI4yxPyRnfZOXdK6Yacu
// SIG // K7RUA05CP8aErAEsAhfcKkee92y4jEopIQSgVrfEZQVF
// SIG // xHdAzpyCD5+GxBoPQxz1PxxzZrlf8ZEupsgW9W0nbH4d
// SIG // 8n9b9BP1Me08ivvusmlnLdIm6lIn3UqWkHgwLtR4gz+p
// SIG // Buwy9OOXwqvcr8TNHFFnfnVUC/dmWGkfr6jY6PwXTI+z
// SIG // fzEOLeN73pkgBklWliXRL97MXfH/V4Qm9wvQJ8zc8/0u
// SIG // iBHwWgwZS7+bOxcdbOUl1dIyO+E9aHFcLfMqD6UPOyqt
// SIG // Y1kH94/AFCQx2k4MmGcAfgshWA==
// SIG // End signature block
