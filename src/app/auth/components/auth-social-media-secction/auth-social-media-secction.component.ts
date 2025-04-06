import { Component } from '@angular/core';
import {environments} from "../../../../config/env";

@Component({
  selector: 'auth-social-media-secction',
  templateUrl: './auth-social-media-secction.component.html',
})
export class AuthSocialMediaSecctionComponent {
    public readonly redirectGithub: string = environments.githubOauthURL;
    public readonly redirectGoogle: string = environments.googleOauthURL;
    public readonly redirectMeta: string = environments.metaOauthURL;
}
