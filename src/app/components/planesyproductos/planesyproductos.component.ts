import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Plan } from 'src/app/models/plan';
import { User } from 'src/app/models/user';
import { PlanesService } from 'src/app/services/planes.service';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-planesyproductos',
  templateUrl: './planesyproductos.component.html',
  styleUrls: ['./planesyproductos.component.css']
})
export class PlanesyproductosComponent implements OnInit {

  @Input() product: Plan;

  planes: Plan;
  user: User;
  error: string;

  constructor(
    private http: HttpClient,
    private planesService: PlanesService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getPlanes();
  }

  getPlanes(): void {
    this.planesService.getPlanes().subscribe(
      res =>{
        this.planes = res;
        error => this.error = error
        console.log(this.planes);
      }
    );
  }

  addToCart(): void{
    console.log('sending...')
    this.messageService.sendMessage(this.product);
  }



}
