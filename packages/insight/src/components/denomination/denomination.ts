import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import _ from 'lodash';
import { ApiProvider, ChainNetwork } from '../../providers/api/api';
@Component({
  selector: 'denomination',
  templateUrl: 'denomination.html'
})
export class DenominationComponent {
  public units: any = [];
  public availableNetworks;
  public currencySymbol;
  public showUnits = false;

  constructor(
    public viewCtrl: ViewController,
    public api: ApiProvider,
    public navParams: NavParams
  ) {}

  public ionViewDidEnter() {
    this.currencySymbol = this.navParams.data.currencySymbol;
    this.availableNetworks = this.api.networkSettings.availableNetworks;
    this.showUnits = _.some(
      this.availableNetworks,
      this.api.networkSettings.selectedNetwork
    );
    this.units = [
      this.api.networkSettings.availableNetworks[0].chain,
      this.api.networkSettings.availableNetworks[1].chain
    ];
  }

  public changeUnit(unit: string): void {
    this.currencySymbol = unit;
    this.viewCtrl.data = {
      ...this.viewCtrl.data,
      config: {
        chain: this.currencySymbol,
        network: this.navParams.data.config.network
      },
      currencySymbol: this.currencySymbol
    };
    this.viewCtrl.dismiss({
      ...this.viewCtrl.data
    });
  }

  public changeExplorer(chainNetwork: ChainNetwork): void {
    this.viewCtrl.dismiss({
      chainNetwork,
      currencySymbol: this.currencySymbol
    });
  }
}
