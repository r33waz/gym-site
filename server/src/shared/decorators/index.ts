import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// SetMetaData is a function that attach metadata to the controler or route handler
// piece of infromation withe key value

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
