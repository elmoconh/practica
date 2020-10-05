const  {Schema, model } = require('mongoose');

const questionSchema = new Schema({
ID: String,
Asignatura: String,
Eje_tematico: String,
Unidades_tematicas: String,
Subunidades_tematica:String,
Nivel_Educativo: String,
Indicador: String,
Dificultad: String,
OA1: String,
OA2: String,
OA3: String,
OA4: String,
OAa: String,
OAb: String,
OAc: String,
OAd: String,
OAe: String,
OAf: String,
OAg:String,
Ensayo_Delia: String,
Resolver_problemas: String,
Prueba_tematica: String,
Guía: String,
Tipodepregunta: String,
Enunciado: String,
a: String,
b : String,
c: String,
d : String,
e: String,
Alternativacorrecta: String

});

module.exports = model('Question', questionSchema, 'question');