"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_request, response) => {
    response.send(patientService_1.default.getAll());
});
router.get('/:id', (request, response) => {
    const patient = patientService_1.default.getById(request.params.id);
    if (patient)
        response.send(patient);
    response.status(404);
});
router.post('/', (request, response) => {
    const newPatient = utils_1.default(request.body);
    const createdPatient = patientService_1.default.create(newPatient);
    response.json(createdPatient);
});
exports.default = router;
