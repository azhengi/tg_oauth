"use client"
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function Home() {
    const [data, setData] = useState("");
    const [webAppStr, setWebAppStr] = useState("");

    const openAuthTelegram = async () => {
        const botId = "7274314762";
        (window as any).Telegram.Login.auth(
            { bot_id: botId, request_access: true },
            async (data: {
                auth_date: number;
                first_name: string;
                hash: string;
                id: number;
                last_name: string;
                username: string;
            }) => {
                if (!data) {
                    // authorization failed
                    console.log("Auth failed");
                    return;
                }
            }
        );
    }

    const initTelegramToken = async () => {
        const tgNodeId = "TG_OAUTH";
        const telegramWidgetSrc = "https://telegram.org/js/telegram-widget.js?22";

        if (!document.querySelector(tgNodeId)) {
            const tgScriptNode = document.createElement("script") as HTMLScriptElement;
            tgScriptNode.id = tgNodeId;
            tgScriptNode.src = telegramWidgetSrc;
            tgScriptNode.onload = () => {
                openAuthTelegram();
            };

            document.body.appendChild(tgScriptNode);
        } else {
            openAuthTelegram();
        }
    };

    useEffect(() => {
        const webAppNodeId = "TG_APP";
        const telegramWidgetSrc = "https://telegram.org/js/telegram-web-app.js";

        if (!document.querySelector(webAppNodeId)) {

            const webAppNode = document.createElement("script") as HTMLScriptElement;
            webAppNode.id = webAppNodeId;
            webAppNode.src = telegramWidgetSrc;
            webAppNode.onload = () => {
                if ((window as any)?.Telegram.WebApp) {
                    const tg = (window as any)?.Telegram.WebApp;
                    setWebAppStr(() => JSON.stringify(tg));
                    const initDataUnsafe = tg.initDataUnsafe;
                    setData(() => JSON.stringify(initDataUnsafe));
                } else {
                    console.log('Telegram WebApp is not available.');
                }
            };

            document.body.appendChild(webAppNode);
        } else {
            if ((window as any)?.Telegram.WebApp) {
                const tg = (window as any)?.Telegram.WebApp;
                setWebAppStr(() => JSON.stringify(tg));
                const initDataUnsafe = tg.initDataUnsafe;
                setData(() => JSON.stringify(initDataUnsafe));
            } else {
                console.log('Telegram WebApp is not available.');
            }
        }
        // initTelegramToken();
    }, [])

    const handleClickJoin = () => {
        openAuthTelegram();
    };
    return (
        <>
            <Head>
                <Script src="https://telegram.org/js/telegram-web-app.js"></Script>
            </Head>
            <main className="flex justify-center mt-[30px] flex-col">
                <div>
                    Telegram Login
                </div>

                <div>
                    webApp: {webAppStr}
                </div>
                <div>
                    initDataUnsafe: {data}
                </div>

                <div>
                    <button onClick={handleClickJoin}>
                        进入频道
                    </button>
                </div>
            </main>
        </>

    );
}
