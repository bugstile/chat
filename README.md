# Chatt med Node.js och Socket.io

Detta är en inlämningsuppgift för dig som läser kursen Webbutveckling 3. Utifrån ett givet kodexempel skall en server och en klient för en chatt-applikation implementeras.

##Läsanvisningar
* _WebSockets everywhere with Socket.IO_
http://howtonode.org/websockets-socketio
*	_Socket.io - Docs_ 
http://socket.io/docs/
*	_WebSockets: A Guide – Build New Games_
http://buildnewgames.com/websockets/ (för den mer datakom-intresserade)
*	_BrowserQuest – a massively multiplayer HTML5 (WebSocket + Canvas) game experiment_
https://hacks.mozilla.org/2012/03/browserquest/ (för att efter uppgiften få inspiration kring vilka möjligheter som finns)

##Medverkande kurser
*	Webbutveckling 3
*	Mobila applikationer

##Allmänt om uppgiften
*	Inlämningsdatum är söndag 24/1 kl. 23:59.
*	Uppgiften löses enskilt.
*	Node.js och Socket.io ska användas. I övrigt är bibliotek och tekniker frivilliga.
*	Källkod redovisas på med en pull request på GitHub i repot socketio-chat.
*	Någon rapport behöver ej skrivas men vid inlämning skriver du en liten reflektion som meddelande när du lämnar en pull request. Reflektionen skall innehålla
 * dina tankar om hur det var att jobba med Node.js och npm samt
 * vilka möjligheter du ser med WebSocket och Socket.io.

##Specifikation
Använd exempelkoden som start för att bygga en fullt fungerande chatt. Du kan använda nedanstående punkter till hjälp. Samtliga krävs ej för att klara uppgiften men ju fler desto bättre. (Använd bedömningsmatrisen för att nå dit du vill.)

* [x]	Acceptera endast anslutningar från vissa adresser (localhost).
* [x] Låt användaren bestämma sitt namn.
* [x] Namn måste vara unika men kan ändras av användaren när som helst.
* [x] Skriv ut information om att användare ansluter, lämnar, byter namn etc.
* [x]	Implementera funktionalitet för ”Användare #1 skriver…”-meddelande när någon börjat skriva ett meddelande men ännu inte skickat iväg det.
* [x]	Visa en lista över aktiva användare.
* [ ]	Stöd för privata meddelanden.
* [x]	Stöd för ”action”-meddelanden. T.ex. att skicka ”/me äter en glass” visas som *Martin äter en glass*
* [ ]	Låt en användare starta ett quiz med ett kommando.
* [x]	Snygga till utseendet.
* [x]	Se till att olika enheter och webbläsare stöds (funktionaliteten hos Socket.io är väldigt bred).
* [x]	Egna förslag.
* [x]	En knapp som gör en like.
