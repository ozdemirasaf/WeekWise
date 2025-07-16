import React, { useEffect } from "react";
import PushNotification from "react-native-push-notification";
import Navigation from "./Navigation";

export default function App() {
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: "default-channel-id", // Bildirimlerde kullanılacak kanal ID
        channelName: "Genel Bildirim Kanalı", // Android'de görünen kanal ismi
      },
      (created) => console.log(`📣 Bildirim kanalı oluşturuldu mu? ${created}`)
    );
  }, []);

  return <Navigation />;
}
