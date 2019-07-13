import {Injectable} from '@angular/core';
import {TokenService} from './token.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {FinHistory} from '../_models/fin-history';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';


@Injectable()
export class FinHistoryService {
  private static FIN_HISTORY_LENGTH = 5;

  private static finHistoryInvestmentsURL = environment.apiURL + '/finhistory/investments';
  private static finHistoryWithdrawalsURL = environment.apiURL + '/finhistory/withdrawals';
  private static addressFinHistoryInvestmentsURL = environment.apiURL + '/finhistory/address-invest';
  private static downloadHistoryUrl = environment.apiURL + '/finhistory/generate-receipt';
  private static downloadAllHistoryUrl = environment.apiURL + '/finhistory/download-history';
  private static fiatTransactionURL = environment.apiURL + '/bank-transaction/get-transactions';
  private static fiatTransactionHistoryURL = environment.apiURL + '/bank-transaction/get-transaction-for-download';

  finHistoryInvestments$: BehaviorSubject<FinHistory[]>;
  finHistoryWithdrawals$: BehaviorSubject<FinHistory[]>;

  private messageSource = new BehaviorSubject('EMPTY');
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private toastr: ToastrService) {
    if (!this.finHistoryInvestments$) {
      this.finHistoryInvestments$ = new BehaviorSubject(null);

      this.http.get<FinHistory[]>(FinHistoryService.finHistoryInvestmentsURL, TokenService.jwt())
        .subscribe((finHistoryInvestments) => {
          this.setInvestments(finHistoryInvestments);
        }, (error) => {
          this.tokenService.processError('[FinHistoryInvestments]', error);
        });
    }

    if (!this.finHistoryWithdrawals$) {
      this.finHistoryWithdrawals$ = new BehaviorSubject(null);

      this.http.get<FinHistory[]>(FinHistoryService.finHistoryWithdrawalsURL, TokenService.jwt())
        .subscribe((finHistoryWithdrawals) => {
          this.setWithdrawals(finHistoryWithdrawals);
        }, (error) => {
          this.tokenService.processError('FinHistoryWithdrawals', error);
        });
    }

    this.tokenService.socket.on('fh-invest-reload-' + TokenService.hash(), (finHistories) => {
      this.setInvestments(finHistories);
      this.messageSource.next('EMPTY');
      this.toastr.success('', 'Balance Updated');
    });

    this.tokenService.socket.on('fh-withdraw-reload-' + TokenService.hash(), (finHistoryInvestmentsPaginator) => {
      this.setWithdrawals(finHistoryInvestmentsPaginator);
      this.toastr.success('', 'Balance Updated');
    });

  }

  static fixPaginate(finHistories: FinHistory[]): FinHistory[] {
    if (finHistories && finHistories.length > 0) {
      const endValue = FinHistoryService.FIN_HISTORY_LENGTH -
        (finHistories.length % FinHistoryService.FIN_HISTORY_LENGTH);

      for (let i = 0; i < endValue; i++) {
        const f = {};
        f['amount'] = '-';
        f['currencyAbbr'] = '-';
        f['currencyName'] = '-';
        f['type'] = '-';
        f['exchangeRateValue'] = '-';
        f['timestamp'] = '-';
        finHistories.push((<FinHistory> f));
      }
    }

    return finHistories;
  }

  getInvestments(): Observable<FinHistory[]> {
    return this.finHistoryInvestments$.asObservable();
  }

  getWithdrawals(): Observable<FinHistory[]> {
    return this.finHistoryWithdrawals$.asObservable();
  }

  setInvestments(finHistories: FinHistory[]) {
    if (finHistories) {
      finHistories = FinHistoryService.fixPaginate(finHistories);
      this.finHistoryInvestments$.next(finHistories);
    }
  }

  setWithdrawals(finHistories: FinHistory[]) {
    if (finHistories) {
      finHistories = FinHistoryService.fixPaginate(finHistories);
      this.finHistoryWithdrawals$.next(finHistories);
    }
  }

  getAddressFinHistory(address: string) {
    return this.http.get<FinHistory[]>(FinHistoryService.addressFinHistoryInvestmentsURL + '/' + address, TokenService.jwt());
  }

  downloadReceipt(receiptData: any) {
    const _u = JSON.parse(localStorage.getItem('_u'));
 return   this.http.post(FinHistoryService.downloadHistoryUrl, {receiptData}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        'x-access-token': _u.token
      }), 'responseType': 'blob',
    });
  }

  downloadAllHistory() {
    const _u = JSON.parse(localStorage.getItem('_u'));
    return this.http.post(FinHistoryService.downloadAllHistoryUrl, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        'x-access-token': _u.token
      }), 'responseType': 'blob',
    });
  }



  getAllFiatTransactions() {
    return this.http.get<any>(FinHistoryService.fiatTransactionURL, TokenService.jwt());
  }

  downloadFiatTransactionById(transactionId, bankTransactionId, name) {
    const _u = JSON.parse(localStorage.getItem('_u'));
    return this.http.post(FinHistoryService.fiatTransactionHistoryURL + '/' + transactionId, {bankTransactionId, name}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': _u.token
      }), 'responseType': 'blob',
    });
  }

}
