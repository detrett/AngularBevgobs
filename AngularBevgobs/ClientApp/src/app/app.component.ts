import { Component, AfterViewInit } from '@angular/core';
declare var bootstrap: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app';

  ngAfterViewInit(): void {
    // Bootstrap tooltip initialization
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    /* BACK TO TOP BUTTON */
    var btn = $('#back-to-top-button');

    $(window).scroll(function () {
      if ($(window).scrollTop() > 700) {
        btn.addClass('show');
      } else {
        btn.removeClass('show');
      }
    });
    btn.on('click', function (e: { preventDefault: () => void; }) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, '300');
    });
  }
}
