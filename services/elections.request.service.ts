import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RequestService } from './request.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

interface Election {
  id: string;
  election_type: string;
  name: string;
  max_votes: number;
  start: string;
  end: string;
  show_results: string;
}
@Injectable()
export class ElectionsRequestService extends RequestService {
  baseURL = 'elections';

  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Lists elections
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/get_election
   * @param queryParams
   * @returns an observable of all elections or elections specified by urlParams
   */
  listElection(queryParams?: any): Observable<Election[]> {
    const electionsObservable = super.get(`${this.baseURL}/election`, queryParams).pipe(
      map((data: {elections: Election[]}) => data.elections)
    );
    return electionsObservable;
  }

  /**
   * Read current election
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/get_current
   * @returns a single election JSON object
   */
  readElectionCurrent(): Observable<Election> {
    const electionObservable = super.get(`${this.baseURL}/current`);
    return electionObservable;
  }

  /**
   * Create elections
   *
   *https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/post_election
   *@returns JSON object containing the election info created
   */
  createElection(data: any): Observable<Election[]> {
    const electionsObservable = super.post(`${this.baseURL}/election`, data);
    return electionsObservable;
  }

  /**
   * Update elections
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/put_election__election_id_
   * @param queryParams
   * @returns JSON object containing the elction info that was updated
   */
  updateElection(data: any, queryParams: any): Observable<Election[]> {
    const electionObservable = super.put(`${this.baseURL}/election/` + queryParams, data);
    return electionObservable;
  }
}
