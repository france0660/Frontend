import { Component,OnInit,EventEmitter,Input,Output,HostListener } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

declare var document: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  side = "side";
  faCoffee = faCoffee;
  isSearchActive: boolean = false;
  isSlideMenu: boolean = false;
  public User_detail: any = null;
  showFiller = false;
  items = [{name:"ขายสินค้า",icon:"shopping_cart",link:"/placeorders"},
          {name:"รายการขายสินค้า",icon:"history",link:"/historybill"},
          {name:"เพิ่มรายการสินค้า",icon:"assignment_returned",link:"/home"},
          {name:"รายการที่สั่งซื้อ",icon:"all_inbox",link:"/orderlist"},
          {name:"Log Out",icon:"logout",link:"/login"}]

  openOrOff : boolean = true;
  constructor(
 
    public router: Router,

  ) {}

  ngOnInit() {}

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }
  toggleMenu() {
    this.isSlideMenu = !this.isSlideMenu;
  }
  changeOpenOrOff(){
    this.openOrOff = !this.openOrOff
  }
  expandCollpse(sectionName:any) {
    console.log(sectionName);

    var CurrentCls = document.getElementById(sectionName).getAttribute("class");
    if (CurrentCls == "collapse" || CurrentCls == "collapse hide") {
      document
        .getElementById(sectionName)
        .setAttribute("class", "collapse show");
      document
        .getElementById(sectionName)
        .previousElementSibling.setAttribute("aria-expanded", "true");
    } else {
      document
        .getElementById(sectionName)
        .setAttribute("class", "collapse hide");
      document
        .getElementById(sectionName)
        .previousElementSibling.setAttribute("aria-expanded", "false");
    }
  }

  toggleFullscreen(elem:any) {
    elem = elem || document.documentElement;
    if (
      !document.fullscreenElement &&
      !document["mozFullScreenElement"] &&
      !document.webkitFullscreenElement &&
      !document["msFullscreenElement"]
    ) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(["ALLOW_KEYBOARD_INPUT"]);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document["msExitFullscreen"]) {
        document["msExitFullscreen"]();
      } else if (document["mozCancelFullScreen"]) {
        document["mozCancelFullScreen"]();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  routeTo(data:string) {
    // this.AuthService.logout();
    if(data == '/login'){
      localStorage.removeItem('userDetail')
      // localStorage.removeItem('billDetail')
      // localStorage.removeItem('billDetailprice0')
    }
    this.router.navigate([data]);
  }
}

