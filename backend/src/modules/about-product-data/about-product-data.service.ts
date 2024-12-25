import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from 'src/commons';
import { aboutProductDataRepository } from './repository/about_product_data.repository';
import { CreateAboutProductDataInput } from './dto/create-about-product-data.dto';
import { AboutProductData } from './entities/about-product-data.entity';
import { UpdateAboutProductDataInput } from './dto/update-about-product-data.dto';
import { AboutProductSizeChartImageService } from '../about-product-size-chart-image/about-product-size-chart-image.service';
import { AboutProductTopBarImageService } from '../about-product-top-bar-image/about-product-top-bar-image.service';
import { AboutProductSizeChartImage } from '../about-product-size-chart-image/entities/about-product-size-chart-image.entity';
import { dataSource } from 'src/core/data-source';
import { AboutProductTopBarImage } from '../about-product-top-bar-image/entities/about-product-top-bar-image.entity';
import { AboutProductBottomBarImage } from '../about-product-bottom-bar-image/entities/about-product-bottom-bar-image.entity';

@Injectable()
export class AboutProductDataService extends AbstractService {
  constructor() {
    super(aboutProductDataRepository);
  }

  async create(
    data: CreateAboutProductDataInput,
    relations: string[] = null,
  ): Promise<AboutProductData | boolean> {
    const {
      size_chart_image_ids,
      top_bar_images_ids,
      bottom_bar_images_ids,
      ...rest
    } = data;
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const createAboutProductData = await queryRunner.manager.save(
        AboutProductData,
        {
          ...rest,
          created_at: Date.now(),
        },
      );
      if (createAboutProductData) {
        for (const size_chart_image_id of size_chart_image_ids) {
          if (size_chart_image_id) {
            await queryRunner.manager.save(AboutProductSizeChartImage, {
              about_product_data_id: createAboutProductData.id,
              size_chart_image_id: size_chart_image_id,
              created_at: Date.now(),
            });
          }
        }
        for (const top_bar_images_id of top_bar_images_ids) {
          if (top_bar_images_id) {
            await queryRunner.manager.save(AboutProductTopBarImage, {
              about_product_data_id: createAboutProductData.id,
              top_bar_images_id: top_bar_images_id,
              created_at: Date.now(),
            });
          }
        }
        for (const bottom_bar_images_id of bottom_bar_images_ids) {
          if (bottom_bar_images_id) {
            await queryRunner.manager.save(AboutProductBottomBarImage, {
              about_product_data_id: createAboutProductData.id,
              bottom_bar_images_id: bottom_bar_images_id,
              created_at: Date.now(),
            });
          }
        }
      }
      if (createAboutProductData && createAboutProductData.id) {
        await queryRunner.commitTransaction();
        return await this.findOne({
          where: { id: createAboutProductData.id },
          relations: {
            about_product_size_chart_image: true,
            about_product_top_bar_image: true,
            about_product_bottom_bar_images: true,
          },
        });
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: number,
    data: UpdateAboutProductDataInput,
  ): Promise<AboutProductData | boolean> {
    const {
      size_chart_image_ids,
      top_bar_images_ids,
      bottom_bar_images_ids,
      ...rest
    } = data;
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const currentAboutProductData = await this.findOne({
        where: { id },
        relations: {
          about_product_size_chart_image: true,
          about_product_top_bar_image: true,
          about_product_bottom_bar_images: true,
        },
      });

      const currentSizeChartImageIds =
        currentAboutProductData.about_product_size_chart_image.map(
          (image) => image.size_chart_image_id,
        );
      const currentTopBarImageIds =
        currentAboutProductData.about_product_top_bar_image.map(
          (image) => image.top_bar_images_id,
        );
      const currentBottomBarImageIds =
        currentAboutProductData.about_product_bottom_bar_images.map(
          (image) => image.bottom_bar_images_id,
        );

      const sizeChartImagesToDelete = currentSizeChartImageIds.filter(
        (id) => !size_chart_image_ids.includes(id),
      );
      const topBarImagesToDelete = currentTopBarImageIds.filter(
        (id) => !top_bar_images_ids.includes(id),
      );
      const bottomBarImagesToDelete = currentBottomBarImageIds.filter(
        (id) => !bottom_bar_images_ids.includes(id),
      );

      const sizeChartImagesToAdd = size_chart_image_ids.filter(
        (id) => !currentSizeChartImageIds.includes(id),
      );
      const topBarImagesToAdd = top_bar_images_ids.filter(
        (id) => !currentTopBarImageIds.includes(id),
      );
      const bottomBarImagesToAdd = bottom_bar_images_ids.filter(
        (id) => !currentBottomBarImageIds.includes(id),
      );

      const updateAboutProductData = await queryRunner.manager.update(
        AboutProductData,
        id,
        {
          ...rest,
          updated_at: Date.now(),
        },
      );

      if (updateAboutProductData) {
        for (const imageId of sizeChartImagesToDelete) {
          await queryRunner.manager.delete(AboutProductSizeChartImage, {
            about_product_data_id: id,
            size_chart_image_id: imageId,
          });
        }

        for (const imageId of topBarImagesToDelete) {
          await queryRunner.manager.delete(AboutProductTopBarImage, {
            about_product_data_id: id,
            top_bar_images_id: imageId,
          });
        }

        for (const imageId of bottomBarImagesToDelete) {
          await queryRunner.manager.delete(AboutProductBottomBarImage, {
            about_product_data_id: id,
            bottom_bar_images_id: imageId,
          });
        }

        for (const imageId of sizeChartImagesToAdd) {
          if (imageId) {
            await queryRunner.manager.save(AboutProductSizeChartImage, {
              about_product_data_id: id,
              size_chart_image_id: imageId,
              updated_at: Date.now(),
            });
          }
        }

        for (const imageId of topBarImagesToAdd) {
          if (imageId) {
            await queryRunner.manager.save(AboutProductTopBarImage, {
              about_product_data_id: id,
              top_bar_images_id: imageId,
              updated_at: Date.now(),
            });
          }
        }

        for (const imageId of bottomBarImagesToAdd) {
          if (imageId) {
            await queryRunner.manager.save(AboutProductBottomBarImage, {
              about_product_data_id: id,
              bottom_bar_images_id: imageId,
              updated_at: Date.now(),
            });
          }
        }
      }

      if (updateAboutProductData && updateAboutProductData.affected > 0) {
        await queryRunner.commitTransaction();
        return await this.findOne({
          where: { id },
          relations: {
            about_product_size_chart_image: true,
            about_product_top_bar_image: true,
            about_product_bottom_bar_images: true,
          },
        });
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const aboutProductData = await this.findOne({ where: { id } });
    if (!aboutProductData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
