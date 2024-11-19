/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           description: The user's email
 *       example:
 *         id: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@example.com
 *     PaginationLinks:
 *       type: object
 *       properties:
 *         first:
 *           type: string
 *           description: URL for the first page
 *         last:
 *           type: string
 *           description: URL for the last page
 *         prev:
 *           type: string
 *           nullable: true
 *           description: URL for the previous page
 *         next:
 *           type: string
 *           nullable: true
 *           description: URL for the next page
 *     Pagination:
 *       type: object
 *       properties:
 *         currentPage:
 *           type: integer
 *           description: Current page number
 *         totalPages:
 *           type: integer
 *           description: Total number of pages
 *         totalItems:
 *           type: integer
 *           description: Total number of items
 *         itemsPerPage:
 *           type: integer
 *           description: Number of items per page
 *         links:
 *           $ref: '#/components/schemas/PaginationLinks'
 *     UserResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         pagination:
 *           $ref: '#/components/schemas/Pagination'
 *         success:
 *           type: boolean
 *           description: Whether the operation was successful
 *         metadata:
 *           type: object
 *           properties:
 *             message:
 *               type: array
 *               items:
 *                 type: string
 *               description: Any additional messages or errors
 *       example:
 *         data:
 *           - id: d290f1ee-6c54-4b01-90e6-d701748f0851
 *             firstName: John
 *             lastName: Doe
 *             email: john.doe@example.com
 *           - id: a341c4be-3c63-41e5-b78c-4cfe8c2dbb8a
 *             firstName: Jane
 *             lastName: Doe
 *             email: jane.doe@example.com
 *         pagination:
 *           currentPage: 1
 *           totalPages: 2
 *           totalItems: 20
 *           itemsPerPage: 10
 *           links:
 *             first: /users?page=1&pageSize=10
 *             last: /users?page=2&pageSize=10
 *             prev: null
 *             next: /users?page=2&pageSize=10
 *         success: true
 *         metadata:
 *           message: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password (only for requests)
 *       example:
 *         id: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@example.com
 *         password: pass12345
 *     UserResponseData:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique ID of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *       example:
 *         id: 39482cc5-cc09-48e5-aad3-9c261425141b
 *         firstName: Thiago
 *         lastName: Rodrigues
 *         email: new.user5@example.com
 *     ResponseSchema:
 *       type: object
 *       properties:
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/UserResponseData'
 *             - type: null
 *           description: Data returned by the operation
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
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: The page number to retrieve
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           description: The number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           description: Field to sort by (e.g., 'firstName', 'email')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           description: Order to sort (ascending or descending)
 *     responses:
 *       200:
 *         description: List of users with pagination
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseSchema'
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseSchema'
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the user to delete
 *     responses:
 *       204:
 *         description: User deleted successfully (no content)
 */