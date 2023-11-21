import { Tienda } from './Tienda.model';
import { usuario } from './Tienda.model';

describe('Tienda', () => {
  it('should create an instance', () => {
    expect(new Tienda()).toBeTruthy();
  });
});
describe('usuario', () => {
  it('should create an instance', () => {
     expect(new usuario()).toBeTruthy();
  });
  
  });
