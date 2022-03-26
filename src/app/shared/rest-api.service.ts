import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
})
export class RestApiService {
    // Define API
    apiURL = 'http://api.alquran.cloud/v1';
    constructor(private http: HttpClient) { }
    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    // #################################################################
    // # EDITION
    // #################################################################
    /**
     * Lists all editions
     * @returns "data": [
     *  {
     *      "identifier": "ar.muyassar",
     *      "language": "ar",
     *      "name": "تفسير المیسر",
     *      "englishName": "King Fahad Quran Complex",
     *      "format": "text",
     *      "type": "tafsir",
     *      "direction": "rtl"
     *  },
     * ...
     * ]
     * Lists all audio editions in french of the versebyverse type 
     * http://api.alquran.cloud/v1/edition?format=audio&language=fr&type=versebyverse 
     */ 
    listAllEditions(): Observable<any> {
        return this.http
            .get<any>(this.apiURL + '/edition')
            .pipe(retry(1), catchError(this.handleError));
    }

    /**
     * listLanguages
     * Lists all languages in which editions are available 
     * @returns data: [
     *  "ar",
     *  "az",
     *  "bn",
     *  "cs",
     *  "de",
     *  ...
     *   ]
     */
    getAllLanguages(): Observable<any> {
        return this.http
            .get<any>(this.apiURL + '/edition/language')
            .pipe(retry(1), catchError(this.handleError));
    }

    /**
     * listEditionsFronLanguage
     * Lists all editions for a given language {{language}} is a 2 digit language code. 
     * Example: en for English, fr for French, ar for Arabic 
     * @param lang 
     * @returns data": [
     *   {
     *       "identifier": "en.ahmedali",
     *       "language": "en",
     *       "name": "Ahmed Ali",
     *       "englishName": "Ahmed Ali",
     *       "format": "text",
     *       "type": "translation",
     *       "direction": "ltr"
     *   }, ...
     * ] 
     */
    listAllEditionsForLanguage(lang: string){
        return this.http
            .get<any>(this.apiURL + '/edition/language/' + lang)
            .pipe(retry(1), catchError(this.handleError));
    }


    /**
     * Lists all types of editions
     * @returns data": [
     *
     *    "tafsir",
     *    "translation",
     *    "quran",
     *    "transliteration",
     *    "versebyverse"
     *
     * ]
     */ 
    listAllTypesOfEdition(){
        return this.http
            .get<any>(this.apiURL + '/type')
            .pipe(retry(1), catchError(this.handleError));
    }

    /**
     * Lists all editions for a given type
     * @param type 
     * @returns 
     */
    listAllEditionsforType(type: string){
        return this.http
            .get<any>(this.apiURL + '/type/' + type)
            .pipe(retry(1), catchError(this.handleError));
    }

    /**
     * Lists all formats  
     * @returns 
     */
     listAllFormats(){
        return this.http
            .get<any>(this.apiURL + '/format/')
            .pipe(retry(1), catchError(this.handleError));
    }

    /**
     * Lists all editions for a given format
     * format can be audio or text
     * @returns 
     */
     listAllEditionsForFormat(format: string){
        return this.http
            .get<any>(this.apiURL + '/format/' + format)
            .pipe(retry(1), catchError(this.handleError));
    }

    // #################################################################
    // # QURAN
    // #################################################################
    /**
     * Returns a complete Quran edition in the audio or text format
     * {{edition}} is an edition identifier. Example: en.asad for Muhammad Asad's english translation 
     * @param edition 
     * @returns 
     */
    getQuranCompleteEdition(edition: string){
        return this.http
            .get<any>(this.apiURL + '/quran/' + edition)
            .pipe(retry(1), catchError(this.handleError));
    }

    // #################################################################
    // # JUZ
    // #################################################################
    
    /**
     * Returns the requested juz from a particular edition
     * Endpoint: /juz/{{juz}}/{{edition}} 
     * {{edition}} is an edition identifier. Example: en.asad for Muhammad Asad's english translation 
     * Optional Parameters:
     *  offset - Offset ayahs in a juz by the given number
     *  limit - This is the number of ayahs that the response will be limited to.
     *  http://api.alquran.cloud/v1/juz/1/quran-uthmani?offset=3&limit=10 - Returns the the ayahs 4-13 from Juz 1
     * @param juz 
     * @param edition 
     * @returns 
     */
    getJuzFromEdition(juz: number, edition: string){
        return this.http
            .get<any>(this.apiURL + '/juz/' + juz + '/' + edition)
            .pipe(retry(1), catchError(this.handleError));
    }

    // #################################################################
    // # SURAH
    // #################################################################
    
    /**
     * Returns the list of Surahs in the Quran
     * {{edition}} is an edition identifier. Example: en.asad for Muhammad Asad's english translation Optional 
     * Endpoint: /surah
     * Parameters:
     *  offset - Offset ayahs in a juz by the given number
     *  limit - This is the number of ayahs that the response will be limited to.
     * @returns 
     */
    listSurahs(){
        return this.http
            .get<any>(this.apiURL + '/surah')
            .pipe(retry(1), catchError(this.handleError));
    }

    /**
     * Returns the requested surah from a particular edition
     * {{edition}} is an edition identifier. Example: en.asad for Muhammad Asad's english translation 
     * Endpoint: /surah/{{surah}}/{{edition}} 
     * @param surah 
     * @param edition 
     * @returns 
     */
    getSurahFromEdition(surah: number, edition: string){
        return this.http
            .get<any>(this.apiURL + '/surah/' + surah + '/' + edition)
            .pipe(retry(1), catchError(this.handleError));
    }

    /**
     * Returns the requested surah from multiple editions
     * {{edition}} is an edition identifier. Example: en.asad for Muhammad Asad's english translation. You can specify multiple identifiers separated by a comma.  
     * Endpoint: /surah/{{surah}}/editions/{{edition}},{{edition}} 
     * @param surah 
     * @param editions 
     * @returns 
     */
     getSurahFromMultipleEditions(surah: number, editions: string){
        return this.http
            .get<any>(this.apiURL + '/surah/' + surah + '/editions/' + editions)
            .pipe(retry(1), catchError(this.handleError));
    }

    // #################################################################
    // # AYAH
    // #################################################################
    /**
     * Returns an ayah for a given edition.
     * {{reference}} here can be the ayah number or the surah:ayah. For instance, 262 or 2:255 will both get you Ayat Al Kursi
     * {{edition}} is an edition identifier. Example: en.asad for Muhammad Asad's english translation
     * Endpoint: /ayah/{{reference}}/{{edition}}
     * /ayah/262 - (Text) Returns Muhammad Asad's translation Ayat Al Kursi
     * /ayah/2:255 - (Text) Returns Muhammad Asad's translation Ayat Al Kursi
     * /ayah/262/ar.alafasy - (Audio) Returns Mishary Alafasy's recitation of the Ayat Al Kursi
     * /ayah/262 - (Text) Returns the Arabic text of Ayat Al Kursi
     * @param edition 
     * @param reference
     */
    getAyahFromEdition(reference: string,  edition: string){
        return this.http
            .get<any>(this.apiURL + '/ayah/' + reference + '/' + edition)
            .pipe(retry(1), catchError(this.handleError));
    }

    /**
     * Returns an ayah for multiple edtitions.
     * {{reference}} here can be the ayah number or the surah:ayah. For instance, 262 or 2:255 will both get you Ayat Al Kursi
     * {{edition}} is an edition identifier. Example: en.asad for Muhammad Asad's english translation. You can specify multiple editions separated by a comma
     * Endpoint: /ayah/{{reference}}/editions/{{edition}},{{edition}}
     * /ayah/262/editions/quran-uthmani,en.asad,en.pickthall - (Text) Returns Ayat Al Kursi from 3 editions: Simple Quran, Muhammad Asad and Maramduke Pickthall
     * @param editions 
     * @param reference
     * @returns 
     */
     getAyahFromMultipleEditions(reference: string,  editions: string){
        return this.http
            .get<any>(this.apiURL + '/ayah/' + reference + '/edition/' + editions)
            .pipe(retry(1), catchError(this.handleError));
    }

    // #################################################################
    // # SEARCH
    // #################################################################
    /**
     * Returns ayahs that match a keyword in a given edition or language. If you do not specify an edition or language, all english language texts are searched.
     * {{surah}} Enter a surah number (between 1 and 114) to search a specific surah or 'all' to search all the text {{edition}} is an edition identifier. Example: en.asad for Muhammad Asad's english translation
     * {language} is 2 digit alpha language code. Example: en for English, fr for french
     * Endpoint: /search/{{keyword}}/{{surah}}/{{edition or language}}
     * Examples:
     * /search/Abraham/all/en - (Text) Returns all ayahs that contain the word 'Abraham' in all the english editions
     * /search/Abraham/all/en.pickthall - (Text) Returns all ayahs that contain the word 'Abraham' in Maramduke Pickthall's English translation
     * /search/Abraham/37/en.pickthall - (Text) Returns all ayahs that contain the word 'Abraham' Surat As-Saafaat in Maramduke Pickthall's English translation
     * @param keyword 
     * @param surah 
     * @param editionOrLanguage 
     * @returns 
     */
    searchAyahs(keyword: string,  surah: string, editionOrLanguage: string){
        return this.http
            .get<any>(this.apiURL + '/search/' + keyword + '/' + surah + '/' + editionOrLanguage)
            .pipe(retry(1), catchError(this.handleError));
    }
    // #################################################################
    // # MANZIL
    // #################################################################
    /**
     * Returns the requested manzil from a particular edition
     * {{edition}} is an edition identifier. Example: en.asad for Muhammad Asad's english translation
     * Endpoint: /manzil/{{manzil}}/{{edition}}
     * Optional Parameters:
     *  offset - Offset ayahs in a manzil by the given number
     *  limit - This is the number of ayahs that the response will be limited to.
     * Examples:
     * /manzil/7/en.asad - Returns manzil 7 from Muhammad Asad's translation of the Holy Quran
     * /manzil/7/quran-uthmani - Returns the text of Manzil 7 of the Holy Quran
     * /manzil/7/quran-uthmani?offset=3&limit=10 - Returns the the ayahs 4-13 from Manzil 7
     * @param manzil 
     * @param edition 
     * @returns 
     */
    getManzilFromEdition(manzil: string,  edition: string){
        return this.http
            .get<any>(this.apiURL + '/manzil/' + manzil + '/' + edition)
            .pipe(retry(1), catchError(this.handleError));
    }

    // #################################################################
    // # RKU
    // #################################################################
    /**
     * Returns the requested ruku from a particular edition
     * {{edition}} is an edition identifier. Example: en.asad for Muhammad Asad's english translation
     * Optional Parameters:
     *  offset - Offset ayahs in a ruku by the given number
     *  limit - This is the number of ayahs that the response will be limited to.
     * Endpoint: /ruku/{{ruku}}/{{edition}}
     * Expamles:
     * http://api.alquran.cloud/v1/ruku/7/en.asad - Returns ruku 7 from Muhammad Asad's translation of the Holy Quran
     * /ruku/7/quran-uthmani - Returns the text of ruku 7 of the Holy Quran
     * /ruku/7/quran-uthmani?offset=3&limit=3 - Returns the the ayahs 4-6 from ruku 7
     * @param ruku 
     * @param edition 
     * @returns 
     */
    getRukuFromEdition(ruku: string,  edition: string){
        return this.http
            .get<any>(this.apiURL + '/ruku/' + ruku + '/' + edition)
            .pipe(retry(1), catchError(this.handleError));
    }

    // #################################################################
    // # PAGE
    // #################################################################
    /**
     * Returns the requested page from a particular edition
     * {{edition}} is an edition identifier. Example: en.asad for Muhammad Asad's english translation
     * Endpoint: /page/{{page}}/{{edition}}
     * Optional Parameters:
     *  offset - Offset ayahs in a page by the given number
     *  limit - This is the number of ayahs that the response will be limited to.
     * Examples:
     * /page/1/en.asad - Returns page 1 from Muhammad Asad's translation of the Holy Quran
     * /page/1/quran-uthmani - Returns the text of page 1 of the Holy Quran
     * /page/1/quran-uthmani?offset=2&limit=2 - Returns the the ayahs 3-4 from page 1
     * @param page 
     * @param edition 
     * @returns 
     */
    getPageFromEdition(page: number,  edition: string){
        return this.http
            .get<any>(this.apiURL + '/page/' + page + '/' + edition)
            .pipe(retry(1), catchError(this.handleError));
    }

    // #################################################################
    // # HIZB
    // #################################################################
    /**
     * Returns the requested Hizb Quarter from a particular edition
     * {{edition}} is an edition identifier. Example: en.asad for Muhammad Asad's english translation
     * Optional Parameters:
     *  offset - Offset ayahs in a hizb quarter by the given number
     *  limit - This is the number of ayahs that the response will be limited to.
     * Endpoint: /hizbQuarter/{{hizb}}/{{edition}}
     * Optional Parameters:
     *  offset - Offset ayahs in a page by the given number
     *  limit - This is the number of ayahs that the response will be limited to.
     * Examples:
     * /hizbQuarter/1/en.asad - Returns hizb quarter 1 from Muhammad Asad's translation of the Holy Quran
     * /hizbQuarter/1/quran-uthmani - Returns the text of hizb quarater 1 of the Holy Quran
     * /hizbQuarter/1/quran-uthmani?offset=2&limit=2 - Returns the the ayahs 3-4 from hizb Quarter 1
     * @param page 
     * @param edition 
     * @returns 
     */
     getHizbQuarter(hizb: number,  edition: string){
        return this.http
            .get<any>(this.apiURL + '/hizbQuarter/' + hizb + '/' + edition)
            .pipe(retry(1), catchError(this.handleError));
    }

    // #################################################################
    // # Sajda
    // #################################################################
    /**
     * Returns all the sajda ayahs from a particular edition
     * {{edition}} is an edition identifier. Example: en.asad for Muhammad Asad's english translation
     * Endpoint: /sajda/{{edition}}
     * Examples:
     * /sajda/en.asad - Returns sajda ayahs from Muhammad Asad's translation of the Holy Quran
     * /sajda/quran-uthmani - Returns the text of sajda ayahs of the Holy Quran
     * @param edition 
     */
    getAllSajdaFromEdition(edition: string){
        return this.http
            .get<any>(this.apiURL + '/sajda/' + edition)
            .pipe(retry(1), catchError(this.handleError));
    }
    // #################################################################
    // # META
    // #################################################################
    /**
     * Returns all the meta data about the Qur'an available in this API
     * Endpoint: /meta
     * @returns 
     */
    getQuranMeta(){
        return this.http
            .get<any>(this.apiURL + '/meta')
            .pipe(retry(1), catchError(this.handleError)); 
    }

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }
}