"use client"

import Script from "next/script";

export default function Home() {

  const handleClickJoin = () => {
    (window as any).Telegram.Login.auth(
      { bot_id: "5735438655", request_access: true },
      (data: {
        auth_date: number;
        first_name: string;
        hash: string;
        id: number;
        last_name: string;
        username: string;
      }) => {
        if (!data) {
          // authorization failed
          // console.log("Auth failed");
          alert("Auth failed");
          return;
        }

        // alert(`Auth success. ${JSON.stringify(data)}`);

        const aLink = document.createElement("a");
        aLink.setAttribute("href", "https://www.google.com");
        aLink.setAttribute("target", "_blank");


        setTimeout(() => {
          aLink.click();
        }, 500);

        // Here you would want to validate data like described there https://core.telegram.org/widgets/login#checking-authorization
        // doWhateverYouWantWithData(data);
      }
    );

  };
  return (
    <main className="flex justify-center mt-[30px]">
      <div>
        Telegram Login
      </div>

      <div>
        <button onClick={handleClickJoin}>
          进入频道
        </button>
      </div>

      <Script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-login="xiatouman_bot" data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></Script>
      <Script>
        {
          `
          function onTelegramAuth(user) {
              alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
          }
          `
        }
      </Script>
    </main>
  );
}
