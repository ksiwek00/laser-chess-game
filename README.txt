I. Wymagania systemowe (dla serwera):
	1. Serwer node.js
	2. Baza danych MongoDB

II. Instalacja serwera (wykona� przed pierwszym uruchomieniem serwera na danym komputerze):
	1. Naci�nij ctrl+ppm na folderze z gr�
	2. W okienko konsoli wpisz 'node install'
	3. Po otrzymaniu komunikatu o zako�czeniu procedury wci�nij ctrl+c �eby zako�czy� instalacj�

III. Uruchomienie serwera:
	1. Naci�nij ctrl+ppm na folderze z gr�
	2. W okienko konsoli wpisz 'node server'
	3. Aby zamkn�� serwer wci�nij ctrl+c

IV. Serwer dzia�a na porcie 3000, aby uruchomi� rozgrywk� nale�y si� do tego portu odwo�a�

V. Uruchomienie gry:
	1. W gr� mo�e gra� jednocze�nie 2 graczy. Ka�dy gracz musi mie� inn� nazw� u�ytkownika.
	2. Pierwszy gracz, kt�ry si� zaloguje wybiera uk�ad startowy planszy dla obu graczy.
	3. Je�eli jeden z graczy zostanie z dowolnej przyczyny roz��czony nale�y zrestartowa� stan gry.
	4. Aby zrestartowa� stan gry jeden z graczy musi nacisn�� przycisk 'RESET' znajduj�cy si� w g��wnym menu, a nast�pnie potwierdzi� decyzj�.
		!UWAGA! RESET GRY WYCZY�CI DANE NA TEMAT OBECNEJ GRY Z SERWERA. NIE U�YWA� GO KIEDY DW�CH GRACZY JEST W TRAKCIE ROZGRYWKI!

VI. Zasady gry:
	1. Cel gry - Zniszcz kr�la przeciwnika
	2. Bia�y gracz rozpoczyna rozgrywk�.
	3. Gracz podczas swojej tury mo�e wykona� jeden z poni�szych ruch�w:
		a) ruszy� jeden z pionk�w na dowolne s�siednie wolne pole (nie na ukos)
		b) obr�ci� jeden z pionk�w o 90 stopni w dowolnym kierunku
		c) obr�ci� sw�j laser
	4. Po zako�czeniu tury gracza jego laser wykonuje strza�. Je�eli promie� trafi w pionek w stron�, kt�ra nie mo�e odbi� lub zablokowa� lasera pionek zostaje usuni�ty z gry.
	5. Ka�dy laser mo�e niszczy� pionek ka�dego gracza (r�wnie� w�asny).
	6. Laser nie mo�e zosta� zniszczony.

VII. Typy pionk�w:
	1. Laser - Wystrzeliwuje promie� niszcz�cy pionki. Ka�dy gracz ma jeden znajduj�cy si� w swoim rogu planszy. Laser nie mo�e zmienia� pozycji. Laser mo�na obr�ci� jedynie w dw�ch kierunkach. Laser nie mo�e zosta� wyeliminowany z rozgrywki.
	2. Deflector - Odbija laser z dw�ch stron pod k�tem 90 stopni. Trafienie w wypuk�� stron� eliminuje pionek z gry.
	3. Defender - Nie mo�e odbija� lasera ale szara strona z tarcz� blokuje jego promie�. Pionek ulega zniszczeniu po trafieniu z dowolnej innej strony.
	4. Switch - Odbija laser z wszystkich czterech stron pod k�tem 90 stopni. Ten pionek nie mo�e zosta� zniszczony.
	5. Kr�l - Nie odbija ani nie blokuje lasera. Zniszczenie kr�la gracza oznacza jego przegran�.