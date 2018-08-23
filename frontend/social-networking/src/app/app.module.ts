import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { ChattingComponent } from './chatting/chatting.component';
import { SearchComponent } from './search/search.component';

import { FirstRegisterService } from './first-register.service';
import { FirstLoginService } from './first-login.service';
import { SearchuserService } from './searchuser.service';
import { SendingRequestService } from './sending-request.service';
import { ConfirmRequestService } from './confirm-request.service';
import { DeclineRequestService } from './decline-request.service';
import { UnfriendUserService } from './unfriend-user.service';
import { ShowPendingRequestService } from './show-pending-request.service';
import { ShowFriendListService } from './show-friend-list.service';
import { PostUploadService } from './post-upload.service';
import { PostShowService } from './post-show.service';
import { RealChatService } from './real-chat.service';
import { ChatFriendListService } from './chat-friend-list.service';
import { RenderMessageServiceService } from './render-message-service.service';
import { RealChattingService } from './real-chatting.service';
import { FindFriendService } from './find-friend.service';
import { FetchingImageService } from './fetching-image.service';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    UserprofileComponent,
    HomeComponent,
    ChatComponent,
    ChattingComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FileUploadModule,
    RouterModule.forRoot([
      {path: "", redirectTo:'login', pathMatch: "full"},
      {path: "register", component: RegisterComponent},
      {path: "", component: LoginComponent},
      {path: "home", component: HomeComponent},
      {path: "profile", component: ProfileComponent},
      {path: "userprofile", component: UserprofileComponent},
      {path: "chat", component: ChatComponent},
      {path: "chatting", component: ChattingComponent},
      {path: "search", component: SearchComponent}
    ])
    
  ],
  providers: [FirstRegisterService, FirstLoginService, SearchuserService, SendingRequestService, ConfirmRequestService, DeclineRequestService, UnfriendUserService, ShowFriendListService, ShowPendingRequestService, PostUploadService, RealChatService, PostShowService, ChatFriendListService, RenderMessageServiceService, RealChattingService, FindFriendService, FetchingImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
