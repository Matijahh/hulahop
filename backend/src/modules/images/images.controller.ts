import {
  Controller,
  Post,
  UseInterceptors,
  HttpStatus,
  Res,
  UploadedFile,
  Get,
  Param,
  BadRequestException,
  StreamableFile,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { baseController } from 'src/core/baseController';
import { Response, Request } from 'express';
import * as fs from 'fs';
import { SkipAuth } from 'src/core/guards/auth-guard';
import { v4 as uuid } from 'uuid';

@ApiTags('images')
@ApiBearerAuth()
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@Res() res: Response, @UploadedFile() file) {
    const result = await this.imagesService.create({
      id: uuid(),
      name: file.filename,
      original_name: file.originalname,
      created_at: Date.now().toString(),
    });

    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Image uploaded successfully',
    );
  }

  @ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      image: {
        type: 'string',
        format: 'binary',
      },
    },
  },
})
@Post('upload-compressed')
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }),
)
async uploadCompressedImage(@Res() res: Response, @UploadedFile() file) {
  const result = await this.imagesService.createCompressedImage({
    id: uuid(),
    original_name: file.originalname,
    name: file.filename,
    created_at: Date.now().toString(),
  });

  return baseController.getResult(
    res,
    HttpStatus.OK,
    result,
    'Compressed image uploaded successfully',
  );
}



  @SkipAuth()
  @Get(':id')
  async getImage(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.imagesService
      .getPathDetails(id)
      .then((file) => {
        if (fs.existsSync(file.path)) {
          const readStream = fs.createReadStream(
            file.path + '/' + file.fileName,
          );
          res.set({
            'Content-Type': `image/${file.ext}`,
          });
          return new StreamableFile(readStream);
        }
      })
      .catch(() => {
        throw new BadRequestException('Image not found');
      });
  }

  @SkipAuth()
@Get('compressed/:id')
async getCompressedImage(
  @Param('id') id: string,
  @Res({ passthrough: true }) res: Response,
) {
  return await this.imagesService
    .getPathDetails(id, true)
    .then((file) => {
      if (fs.existsSync(file.path)) {
        const readStream = fs.createReadStream(
          file.path + '/' + file.compressedFileName,
        );
        res.set({
          'Content-Type': `image/webp`,
        });
        return new StreamableFile(readStream);
      }
    })
    .catch(() => {
      throw new BadRequestException('Compressed image not found');
    });
}

}
