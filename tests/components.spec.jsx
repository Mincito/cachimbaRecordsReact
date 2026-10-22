import React from 'react';
import {render, screen, fireEvent, cleanup} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import ProductCard from '../src/components/ProductCard';
import CartRow from '../src/components/CartRow';
import {addItem, updateQuantity, cartTotal, cartCount, removeItem} from '../src/utils/cart';
import {searchProducts} from '../src/utils/catalog';
import {validateContact, validateRegistration} from '../src/utils/validation';

const vinyl = {id:'cerati', title:'Gustavo Cerati - Bocanada', artist:'Gustavo Cerati', genre:'Rock Latino', price:59990, image:'/images/Bocanada-Cerati.jpg'};
afterEach(() => cleanup());

describe('Cachimba Records - 10 pruebas unitarias (Jasmine + Karma)', () => {
  // 1. lógica del carrito
  it('1. agrega un vinilo al carrito vacío', () => {
    const cart = addItem([], vinyl);
    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(1);
  });
  // 2. estado/cantidad
  it('2. incrementa cantidad sin duplicar filas', () => {
    const cart = addItem(addItem([], vinyl), vinyl);
    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(2);
  });
  // 3. interacción actualización
  it('3. cambia cantidad del producto', () => {
    const cart = updateQuantity(addItem([], vinyl), 'cerati', 3);
    expect(cart[0].quantity).toBe(3);
  });
  // 4. lógica precio
  it('4. calcula el total según precio y cantidad', () => {
    const cart = updateQuantity(addItem([], vinyl), 'cerati', 3);
    expect(cartTotal(cart)).toBe(179970);
  });
  // 5. acciones del carrito
  it('5. elimina correctamente un producto', () => {
    const cart = removeItem(addItem([], vinyl), 'cerati');
    expect(cartCount(cart)).toBe(0);
  });
  // 6. filtros
  it('6. busca ignorando mayúsculas y tildes', () => {
    expect(searchProducts([vinyl], 'CERATI').length).toBe(1);
    expect(searchProducts([vinyl], 'bocanada').length).toBe(1);
    expect(searchProducts([vinyl], 'no existe').length).toBe(0);
  });
  // 7. validación negativa
  it('7. rechaza contacto inválido', () => {
    const errors = validateContact({name:'A',email:'correo-malo',message:'Hola'});
    expect(Object.keys(errors).length).toBe(3);
  });
  // 8. validación positiva
  it('8. acepta un contacto válido', () => {
    const errors = validateContact({name:'Cliente Prueba',email:'prueba@correo.cl',message:'Quiero consultar por un disco.'});
    expect(Object.keys(errors).length).toBe(0);
  });
  // 9. registro
  it('9. identifica contraseñas diferentes', () => {
    const errors = validateRegistration({email:'prueba@correo.cl', password:'123456',confirm:'abcdef'});
    expect(errors.confirm).toContain('no coinciden');
  });
  // 10. prueba del DOM y propiedades del componente
  it('10. renderiza título y precio desde props', () => {
    render(<MemoryRouter><ProductCard product={vinyl} onAdd={() => {}} /></MemoryRouter>);
    expect(screen.getByRole('heading', {name:'Gustavo Cerati - Bocanada'})).toBeTruthy();
    expect(screen.getByText(/59\.990/)).toBeTruthy();
  });
  // 11. evento DOM y spy (mocking)
  it('11. llama el callback al presionar Agregar al carrito', () => {
    const callback = jasmine.createSpy('agregar');
    render(<MemoryRouter><ProductCard product={vinyl} onAdd={callback} /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', {name:/Agregar al carrito/i}));
    expect(callback).toHaveBeenCalledOnceWith(vinyl);
  });
  // 12. evento DOM y spy (mocking)
  it('12. llama la acción eliminar desde la fila del carrito', () => {
    const callback = jasmine.createSpy('eliminar');
    render(<CartRow item={{...vinyl,quantity:1}} onQuantity={() => {}} onRemove={callback}/>);
    fireEvent.click(screen.getByRole('button', {name:'Eliminar'}));
    expect(callback).toHaveBeenCalledOnceWith('cerati');
  });
});
