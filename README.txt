I. Wymagania systemowe (dla serwera):
	1. Serwer node.js
	2. Baza danych MongoDB

II. Instalacja serwera (wykonaæ przed pierwszym uruchomieniem serwera na danym komputerze):
	1. Naciœnij ctrl+ppm na folderze z gr¹
	2. W okienko konsoli wpisz 'node install'
	3. Po otrzymaniu komunikatu o zakoñczeniu procedury wciœnij ctrl+c ¿eby zakoñczyæ instalacjê

III. Uruchomienie serwera:
	1. Naciœnij ctrl+ppm na folderze z gr¹
	2. W okienko konsoli wpisz 'node server'
	3. Aby zamkn¹æ serwer wciœnij ctrl+c

IV. Serwer dzia³a na porcie 3000, aby uruchomiæ rozgrywkê nale¿y siê do tego portu odwo³aæ

V. Uruchomienie gry:
	1. W grê mo¿e graæ jednoczeœnie 2 graczy. Ka¿dy gracz musi mieæ inn¹ nazwê u¿ytkownika.
	2. Pierwszy gracz, który siê zaloguje wybiera uk³ad startowy planszy dla obu graczy.
	3. Je¿eli jeden z graczy zostanie z dowolnej przyczyny roz³¹czony nale¿y zrestartowaæ stan gry.
	4. Aby zrestartowaæ stan gry jeden z graczy musi nacisn¹æ przycisk 'RESET' znajduj¹cy siê w g³ównym menu, a nastêpnie potwierdziæ decyzjê.
		!UWAGA! RESET GRY WYCZYŒCI DANE NA TEMAT OBECNEJ GRY Z SERWERA. NIE U¯YWAÆ GO KIEDY DWÓCH GRACZY JEST W TRAKCIE ROZGRYWKI!

VI. Zasady gry:
	1. Cel gry - Zniszcz króla przeciwnika
	2. Bia³y gracz rozpoczyna rozgrywkê.
	3. Gracz podczas swojej tury mo¿e wykonaæ jeden z poni¿szych ruchów:
		a) ruszyæ jeden z pionków na dowolne s¹siednie wolne pole (nie na ukos)
		b) obróciæ jeden z pionków o 90 stopni w dowolnym kierunku
		c) obróciæ swój laser
	4. Po zakoñczeniu tury gracza jego laser wykonuje strza³. Je¿eli promieñ trafi w pionek w stronê, która nie mo¿e odbiæ lub zablokowaæ lasera pionek zostaje usuniêty z gry.
	5. Ka¿dy laser mo¿e niszczyæ pionek ka¿dego gracza (równie¿ w³asny).
	6. Laser nie mo¿e zostaæ zniszczony.

VII. Typy pionków:
	1. Laser - Wystrzeliwuje promieñ niszcz¹cy pionki. Ka¿dy gracz ma jeden znajduj¹cy siê w swoim rogu planszy. Laser nie mo¿e zmieniaæ pozycji. Laser mo¿na obróciæ jedynie w dwóch kierunkach. Laser nie mo¿e zostaæ wyeliminowany z rozgrywki.
	2. Deflector - Odbija laser z dwóch stron pod k¹tem 90 stopni. Trafienie w wypuk³¹ stronê eliminuje pionek z gry.
	3. Defender - Nie mo¿e odbijaæ lasera ale szara strona z tarcz¹ blokuje jego promieñ. Pionek ulega zniszczeniu po trafieniu z dowolnej innej strony.
	4. Switch - Odbija laser z wszystkich czterech stron pod k¹tem 90 stopni. Ten pionek nie mo¿e zostaæ zniszczony.
	5. Król - Nie odbija ani nie blokuje lasera. Zniszczenie króla gracza oznacza jego przegran¹.