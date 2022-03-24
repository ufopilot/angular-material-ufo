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
    listLanguages(): Observable<any> {
        return this.http
            .get<any>(this.apiURL + '/language')
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
            .get<any>(this.apiURL + '/language/' + lang)
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