import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {CommentType} from "../../../types/comment.type";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getComments(params: {offset: number, article: string}): Observable<{allCount: number, comments: CommentType[]}> {
    return this.http.get<{allCount: number, comments: CommentType[]}>(environment.api + 'comments?' + 'offset=' + params.offset + '&article=' + params.article)
  }

  getActionsForComments(id: string): Observable<{comment: string, action: string}[] | DefaultResponseType> {
    return this.http.get<{comment: string, action: string}[] | DefaultResponseType>(environment.api + 'comments/' + id +'/actions')
  }

  addComment(params: {text: string | null | undefined, article: string}): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', params)
  }

  addAction(action: string, id: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + id + '/apply-action', {
      action: action
    })
  }

}
