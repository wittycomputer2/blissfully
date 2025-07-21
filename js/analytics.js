// Google Analytics 4 events
function trackFormStart() {
    if (typeof gtag === 'function') {
        gtag('event', 'form_start', {
            'event_category': 'lead_magnet',
            'event_label': 'essence_words_guide'
        });
    }
}

function trackFormComplete() {
    if (typeof gtag === 'function') {
        gtag('event', 'form_complete', {
            'event_category': 'conversion',
            'event_label': 'essence_words_guide',
            'value': 1
        });
    }
}
