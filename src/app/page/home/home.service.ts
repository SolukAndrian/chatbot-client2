
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/throw';
// import {DTOConverter} from '../../dto/dto.converter';
// import {NGXLogger} from 'ngx-logger';
// import {LinkCategoryDTO} from "../../dto/category/LinkCategoryDTO";
// import {LinkProductDTO} from "../../dto/products/LinkProductDTO";
// import {CategoryDTO} from "../../dto/category/CategoryDTO";
// import {ProductDTO} from "../../dto/products/ProductDTO";
import {ChatbotService} from "../../services/chatbot.service";

@Injectable()
export class HomeService {

  constructor(private chatbot: ChatbotService) {
  }

}
