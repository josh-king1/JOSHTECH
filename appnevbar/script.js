      $(document).ready(function() {
            // Navigation Logic
            $('.list').click(function() {
                $('.list').removeClass('active');
                $(this).addClass('active');
                const target = $(this).data('target');
                $('.content-page').removeClass('active');
                $('#' + target).addClass('active');
            });

            // Theme Toggle Logic
            $('#theme-toggle').click(function() {
                $('body').toggleClass('dark-mode');
                
                const isDark = $('body').hasClass('dark-mode');
                const iconName = isDark ? 'sunny-outline' : 'moon-outline';
                $('#theme-icon').attr('name', iconName);
            });
        });