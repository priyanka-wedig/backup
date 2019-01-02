import {ErrorHandler} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
export class AppErrorHandler implements ErrorHandler{
    private ToastrServ:ToastrService;
    constructor(){

    }
    handleError(error){
            console.log(error);
        /* this.ToastrServ.error("unaccepted error occured", 'Faild!'); */
        /* this.ToastrServ.error("unaccepted error occured", 'Faild!'); */
        /* alert('an unexpected error occurred'); */
        
    }
}