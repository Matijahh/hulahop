import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { config } from '../../../commons/config';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromBodyField('refresh_token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: config.refreshKey,
    });
  }

  async validate(payload: any) {
    const { id } = payload;
    return { user_id: id };
  }
}
