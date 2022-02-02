import assert from 'assert';
import {login} from '../src/js/modules/loginSystem.mjs';

describe('Test validar email', function () {
    it('valida correctamente!', () => {
        assert.equal(login.validarEmail('adminadmin@adminer.com'), true);
    });
    it('email incorrecto regexp!', () => {
        assert.notEqual(login.validarEmail('admin@.adminer.com'), true);
    });
});

describe('Test validar password', function () {
    it('valida correctamente!', () => {
        assert.equal(login.validarPassword('AdminAd123'), true);
    });
    it('contraseña no cumple con regexp!', () => {
        assert.notEqual(login.validarPassword('adminAdmin'), true);
    });
});

describe('Test validar name', function () {
    it('valida correctamente!', () => {
        assert.equal(login.validarName('santimb96'), true);
    });
    it('name incorrecto regexp!', () => {
        assert.notEqual(login.validarName('santimb96837252651212'), true);
    });
});

describe('Test validar todo', function () {
    it('valida correctamente!', () => {
        assert.deepEqual(login.validarTodo('adminadmin@adminer.com', 'AdminAd123'), ['admin', true]);
    });
    it('test valida si falla', () => {
        assert.deepEqual(login.validarTodo('adminadmin@adminer.com', ''), ['', false]);
    })
});

describe('Test validar password1 === password2', function () {
    it('valida correctamente!', () => {
        assert.equal(login.passwordsIguales('AdminAd123', 'AdminAd123'), true);
    });
    it('valida si no son iguales', () => {
        assert.notEqual(login.passwordsIguales('AdminAd123', 'AdminAd124'), true);
    });
});

describe('Test validar register', function () {
    it('valida correctamente!', () => {
        assert.equal(login.register('santimb96', 'santisanti@santi.com', 'AdminAd123', 'AdminAd123'), true);
    });
    it('registro incorrecto!', () => {
        assert.notEqual(login.register('santimb96', 'santisanti@santi.com', 'AdminAd123', 'AdminAd124'), true);
    });
});







