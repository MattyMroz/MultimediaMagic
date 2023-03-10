$(document).ready(function () {
    const $body = $('body');
    const $header = $('.header');
    const $navbar = $('.navbar');
    const $navlink = $('.navlink');
    const $burger = $('.burger');
    const $bar1 = $('.burger-svg__bar-1');
    const $bar2 = $('.burger-svg__bar-2');
    const $bar3 = $('.burger-svg__bar-3');
    let isChangingState = false;
    let isOpen = false;
    const burgerTL = new TimelineMax();

    // ========== Burger Animations ==========
    function burgerOver() {
        if (!isChangingState) {
            burgerTL.clear();
            if (!isOpen) {
                burgerTL.to($bar1, 0.5, {
                    y: -2,
                    ease: Elastic.easeOut
                })
                    .to($bar2, 0.5, {
                        scaleX: 0.6,
                        ease: Elastic.easeOut,
                        transformOrigin: "50% 50%"
                    }, "-=0.5")
                    .to($bar3, 0.5, {
                        y: 2,
                        ease: Elastic.easeOut
                    }, "-=0.5");
            } else {
                burgerTL.to($bar1, 0.5, {
                    scaleX: 1.2,
                    ease: Elastic.easeOut
                })
                    .to($bar3, 0.5, {
                        scaleX: 1.2,
                        ease: Elastic.easeOut
                    }, "-=0.5");
            }
        }
    }

    function burgerOut() {
        if (!isChangingState) {
            burgerTL.clear();
            if (!isOpen) {
                burgerTL.to($bar1, 0.5, {
                    y: 0,
                    ease: Elastic.easeOut
                })
                    .to($bar2, 0.5, {
                        scaleX: 1,
                        ease: Elastic.easeOut,
                        transformOrigin: "50% 50%"
                    }, "-=0.5")
                    .to($bar3, 0.5, {
                        y: 0,
                        ease: Elastic.easeOut
                    }, "-=0.5");
            } else {
                burgerTL.to($bar1, 0.5, {
                    scaleX: 1,
                    ease: Elastic.easeOut
                })
                    .to($bar3, 0.5, {
                        scaleX: 1,
                        ease: Elastic.easeOut
                    }, "-=0.5");
            }
        }
    }

    function showCloseBurger() {
        burgerTL.clear();
        burgerTL.to($bar1, 0.3, {
            y: 12, // move the bar up
            ease: Power4.easeIn
        })
            .to($bar2, 0.3, {
                scaleX: 1,
                ease: Power4.easeIn
            }, "-=0.3")
            .to($bar3, 0.3, {
                y: -12, // move the bar down
                ease: Power4.easeIn
            }, "-=0.3")
            .to($bar1, 0.5, {
                rotation: 45,
                ease: Elastic.easeOut,
                transformOrigin: "50% 50%"
            })
            .set($bar2, {
                opacity: 0,
                immediateRender: false
            }, "-=0.5")
            .to($bar3, 0.5, {
                rotation: -45,
                ease: Elastic.easeOut,
                transformOrigin: "50% 50%",
                onComplete: function () {
                    isChangingState = false;
                    isOpen = true;
                }
            }, "-=0.5");
    }

    function showOpenBurger() {
        burgerTL.clear();
        burgerTL.to($bar1, 0.3, {
            scaleX: 0,
            ease: Back.easeIn
        })
            .to($bar3, 0.3, {
                scaleX: 0,
                ease: Back.easeIn
            }, "-=0.3")
            .set($bar1, {
                rotation: 0,
                y: 0
            })
            .set($bar2, {
                scaleX: 0,
                opacity: 1
            })
            .set($bar3, {
                rotation: 0,
                y: 0
            })
            .to($bar2, 0.5, {
                scaleX: 1,
                ease: Elastic.easeOut
            })
            .to($bar1, 0.5, {
                scaleX: 1,
                ease: Elastic.easeOut
            }, "-=0.4")
            .to($bar3, 0.5, {
                scaleX: 1,
                ease: Elastic.easeOut,
                onComplete: function () {
                    isChangingState = false;
                    isOpen = false;
                }
            }, "-=0.5");
    }

    // ========== Burger Hover ==========
    $burger.hover(burgerOver, burgerOut);

    // ========== Burger On Click ==========
    $burger.click(function () {
        if (!isChangingState) {
            isChangingState = true;

            if (!isOpen) {
                showCloseBurger();
                $navbar.addClass('active');
                $body.addClass('no__scroll');
            } else {
                showOpenBurger();
                $navbar.removeClass('active');
                $body.removeClass('no__scroll');
            }
        }

    });

    // ========== NavLink On Click ==========
    $navlink.click(function () {
        if ($navbar.hasClass('active')) {
            if (!isChangingState) {
                isChangingState = true;
                if (isOpen) {
                    showOpenBurger();
                    $navbar.removeClass('active');
                    $body.removeClass('no__scroll');
                }
            }
        }
    });

    // ========== Resize ==========
    $(window).resize(function () {
        if ($(window).width() != 0 && !isChangingState) {
            isChangingState = true;
            showOpenBurger();
            $navbar.removeClass('active');
            $body.removeClass('no__scroll');
        }
    });

    // ========== Header Width Functions ==========
    function setHeaderWidth() {
        if ($(window).scrollTop() > 0) {
            $header.addClass('header__scroll');
        } else {
            $header.removeClass('header__scroll');
        }
    }

    // ========== Header Refresh ==========
    $(window).scrollTop(function () {
        setHeaderWidth();
    });

    // ========== Header Scroll ==========
    $(window).scroll(function () {
        setHeaderWidth();
    });

    // ========== Scroll To ==========
    $navlink.click(function (e) {
        e.preventDefault();
        const $target = $($(this).attr('href'));
        const targetOffset = $target.offset().top;
        const headerHeight = $header.outerHeight();
        const scrollTo = targetOffset - headerHeight;

        $('html, body').animate({
            scrollTop: scrollTo
        }, 1000);
    });

    // ========== Rubber Band Animation ==========
    $(function () {
        const $blast = $(".blast");

        $blast.mouseenter(function () {
            $(this).addClass("active__blast");
            $(this).one("animationend", function () {
                $(this).removeClass("active__blast");
            });
        });
    });

    // ========== Particles ==========
    $(function () {
        const $canvas = $('#canvas')[0];
        const $ctx = $canvas.getContext('2d');
        $canvas.width = window.innerWidth;
        $canvas.height = window.innerHeight;
        const $particlesArray = [];
        let $hue = 220;
        let $increments = true;

        const $particleCount = 3; // small is good
        const $particleSize = 18;
        const $particleLineLength = 1;

        const $speedX = 3;
        const halfSpeedX = $speedX / 2;
        const $speedY = 3;
        const halfSpeedY = $speedY / 2;

        $(window).resize(function () {
            $canvas.width = window.innerWidth;
            $canvas.height = window.innerHeight;
        });

        const $mouse = {
            x: undefined,
            y: undefined
        }

        function ClickOrMove(event) {
            $mouse.x = event.x;
            $mouse.y = event.y;
            // ilos?? kulek
            for (let i = 0; i < $particleCount; i++) {
                let particle = new Particle($mouse.x, $mouse.y);
                $particlesArray.push(particle);
            }
        }

        // JQUERY nie dzia??a :(
        const $main = document.querySelector('main');

        $main.addEventListener('click', ClickOrMove);
        $main.addEventListener('mousemove', ClickOrMove);

        class Particle {
            constructor() {
                this.x = $mouse.x;
                this.y = $mouse.y;
                // wielko???? kulek
                this.size = Math.random() * $particleSize + 1;
                // szybkos?? kulek
                this.$speedX = Math.random() * $speedX - halfSpeedX;
                this.$speedY = Math.random() * $speedY - halfSpeedY;
                this.color = 'hsla(' + $hue + ', 100%, 50%, 0.5)';
                // this.color = 'rgba(' + $hue + ', 100%, 50%, 0.5)';

            }

            update() {
                this.x += this.$speedX;
                this.y += this.$speedY;
                if (this.x > 0.2) {
                    this.size -= 0.1;
                }
            }

            draw() {
                $ctx.fillStyle = this.color;
                $ctx.beginPath();
                $ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                $ctx.fill();
            }
        }

        function handleParticle() {
            for (let i = 0; i < $particlesArray.length; i++) {
                $particlesArray[i].update();
                $particlesArray[i].draw();

                for (let j = i; j < $particlesArray.length; j++) {
                    const dx = $particlesArray[i].x - $particlesArray[j].x;
                    const dy = $particlesArray[i].y - $particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        $ctx.beginPath();
                        $ctx.strokeStyle = $particlesArray[i].color;
                        // grubo???? linii
                        // $ctx.lineWidth = $particleLineLength;
                        $ctx.lineWidth = $particlesArray[i].size / 10;
                        $ctx.moveTo($particlesArray[i].x, $particlesArray[i].y);
                        $ctx.lineTo($particlesArray[j].x, $particlesArray[j].y);
                        $ctx.stroke();
                        $ctx.closePath();
                    }
                }

                if ($particlesArray[i].size <= 0.3) {
                    $particlesArray.splice(i, 1);
                    i--;
                }
            }
        }

        function animate() {
            // Rysowanie
            $ctx.clearRect(0, 0, $canvas.width, $canvas.height);
            // $ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
            // $ctx.fillRect(0, 0, $canvas.width, $canvas.height);

            // if ($increments) {
            //     $hue += 2;
            //     if ($hue >= 275) {
            //         $increments = false;
            //     }
            // } else {
            //     $hue -= 1;
            //     if ($hue <= 220) {
            //         $increments = true;
            //     }
            // }

            $hue += 1;

            // $canvas.style.filter = 'drop-shadow(0 0 3rem hsla(' + $hue + ', 100%, 50%, 0.5)) drop-shadow(0 0 1rem hsla(' + $hue + ', 100%, 50%, 0.5))';

            document.body.style.setProperty('--selection-color', 'hsla(' + $hue + ',100%, 60%, .2)');

            document.body.style.setProperty('--first-color', 'hsla(' + $hue + ',100%, 50%, .75)');

            document.body.style.setProperty('--first-color-alt', 'hsla(' + $hue + ',100%, 50%, .75)');

            handleParticle();
            requestAnimationFrame(animate);
        }
        animate();
    });


    // ========== Music ==========
    // $(function () {
    //     const $toggleMusicButton = $('#toggle__music-button');
    //     const $music = $('#music');

    //     $music[0].play();

    //     $music[0].play().catch(function (error) {
    //         $toggleMusicButton.addClass('disabled');
    //     });

    //     $toggleMusicButton.click(() => {
    //         if ($music[0].paused) {
    //             $music[0].play();
    //             $toggleMusicButton.removeClass('disabled');
    //         } else {
    //             $music[0].pause();
    //             $toggleMusicButton.addClass('disabled');
    //         }
    //     });

    //     $music.on('ended', () => {
    //         $music[0].currentTime = 0;
    //         $music[0].play();
    //     });
    // });


    $(function () {
        const $toggleMusicButton = $('#toggle__music-button');
        const $music = $('#music');

        function setCookie(name, value, days) {
            const expires = new Date();
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
        }

        function getCookie(name) {
            const nameEQ = name + '=';
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        const musicCookie = getCookie('music');

        if (musicCookie === 'playing') {
            $music[0].play();
        } else {
            $music[0].pause();
        }

        $music[0].play().catch(function (error) {
            $toggleMusicButton.addClass('disabled');
        });

        $toggleMusicButton.click(() => {
            if ($music[0].paused) {
                $music[0].play();
                setCookie('music', 'playing', 365);
                $toggleMusicButton.removeClass('disabled');
            } else {
                $music[0].pause();
                setCookie('music', 'paused', 365);
                $toggleMusicButton.addClass('disabled');
            }
        });

        $music.on('ended', () => {
            $music[0].currentTime = 0;
            $music[0].play();
        });
    });
});