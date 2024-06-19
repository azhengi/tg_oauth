import Script from "next/script";

export default function Home() {

    return (
        <main className="flex justify-center mt-[30px]">
            <form action="?" method="POST">
                <div id="html_element"></div>
                <br />
                <input type="submit" value="Submit" />
            </form>
            <Script>
                {`
                var onloadCallback = function() {
                    grecaptcha.render('html_element', {
                        sitekey: "6LfxL_wpAAAAAJWTUXJsoAPDj02xBl5oWXZ95mR4",
                        callback: (token) => {
                            console.log("TOKEN", token);
                        }
                    });
                };
                `
                }
            </Script>
            <Script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback" async defer />
        </main>
    );
}

