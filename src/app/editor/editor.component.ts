import { Component, ViewChild, OnInit, Renderer2, Inject ,  } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormsModule } from '@angular/forms' ;
import { DOCUMENT } from '@angular/common';
const LOCAL_STORAGE_KEY = 'CKEDITOR_CS_CONFIG';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit  {
  mySubscription: any;

  @ViewChild( 'form', { static: false } ) public form?: NgForm;
  constructor(

      private _renderer2: Renderer2,

    @Inject(DOCUMENT) private _document: Document) {

      
    }



    ngOnInit() {

	let script = this._renderer2.createElement('script');
	script.type = `text/javascript`;
	script.text = `
	var userid = window.localStorage.getItem('fullname') ;

	tinymce.init({
	  selector: "#myTextarea",
	  plugins: [
		'advlist autolink lists link image charmap print preview anchor',
		'searchreplace visualblocks code fullscreen',
		'insertdatetime media table paste code help wordcount' ,
		'image' , 'save' , 'autosave'
    ],
    autosave_interval: "5s",
    autosave_prefix: "tinymce-autosave" ,
    save_onsavecallback: function () { console.log('Saved'); } ,
	  toolbar:
		'undo redo save | formatselect | bold italic backcolor | \
		alignleft aligncenter alignright alignjustify | \
		bullist numlist outdent indent image | removeformat insertdatetime | restoredraft help' ,
	  menubar: "insert",
	  image_uploadtab: false ,
	  external_plugins: {"wave": "https://cdn2.codox.io/waveTinymce/plugin.min.js"},
	  wave: {
		"docId": "doc1", // unique document id,
		"username": "mansi" , // unique username or email address
		"apiKey": "d6b9a90b-7b75-4038-b7aa-4439cc403380" // this is your actual API Key
	  },
	});
	`;

	this._renderer2.appendChild(this._document.body, script);


  }


}
