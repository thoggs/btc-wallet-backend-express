/**
 * @swagger
 * components:
 *   schemas:
 *     ValidationError:
 *       type: object
 *       properties:
 *         errorCode:
 *           type: string
 *           description: The error code
 *           example: VALIDATION_ERROR
 *         errorMessage:
 *           type: string
 *           description: A detailed message about the error
 *           example: Email is required.
 *         field:
 *           type: string
 *           description: The field that caused the error
 *           example: email
 *     ValidationErrorResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items: {}
 *           description: Empty array when validation fails
 *           example: []
 *         success:
 *           type: boolean
 *           description: Indicates the operation was not successful
 *           example: false
 *         metadata:
 *           type: object
 *           properties:
 *             message:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ValidationError'
 *           example:
 *             message:
 *               - errorCode: VALIDATION_ERROR
 *                 errorMessage: Email is required.
 *                 field: email
 *               - errorCode: VALIDATION_ERROR
 *                 errorMessage: Password is required.
 *                 field: password
 *     AuthSignInRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         email: john.doe@example.com
 *         password: pass12345
 *     AuthSignInResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *               example:
 *                 id: dea5b1ae-6825-4457-b517-f3456cb335c4
 *                 firstName: John
 *                 lastName: Doe
 *                 email: john.doe@example.com
 *             accessToken:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         success:
 *           type: boolean
 *           example: true
 *         metadata:
 *           type: object
 *           properties:
 *             message:
 *               type: array
 *               items:
 *                 type: string
 *               example: []
 *     AuthSignUpRequest:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@example.com
 *         password: pass12345
 *     AuthSignUpResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique ID of the user
 *                 firstName:
 *                   type: string
 *                   description: The first name of the user
 *                 lastName:
 *                   type: string
 *                   description: The last name of the user
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The email of the user
 *               example:
 *                 id: b9060c31-7f72-4e15-9554-120716aa11d6
 *                 firstName: John
 *                 lastName: Doe
 *                 email: john.doeg5@example.com
 *             accessToken:
 *               type: string
 *               description: The JWT access token
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI5MDYwYz
 *         success:
 *           type: boolean
 *           description: Whether the operation was successful
 *           example: true
 *         metadata:
 *           type: object
 *           properties:
 *             message:
 *               type: array
 *               items:
 *                 type: string
 *               description: Any additional messages or errors
 *           example:
 *             message: []
 */

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Authenticate a user and return an access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthSignInRequest'
 *     responses:
 *       200:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthSignInResponse'
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user and return an access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthSignUpRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthSignUpResponse'
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 */
