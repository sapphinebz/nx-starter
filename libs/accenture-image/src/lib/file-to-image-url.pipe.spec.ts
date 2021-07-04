import { FileToImageUrlPipe } from './file-to-image-url.pipe';

describe('FileToImageUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new FileToImageUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
