import Script from "next/script";

export default function Home() {
  return (
    <main className="flex ">
      <div>
        Telegram Login
      </div>

      <Script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-login="Youm_bot" data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></Script>
      <Script>
        {
          `function onTelegramAuth(user) {
                    alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
            }`
        }
      </Script>
    </main>
  );
}
