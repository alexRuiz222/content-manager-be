const { Router } = require("express");
const authenticateToken = require("../../middlewares/auth");
const multer = require("multer");
const upload = multer({ dest: "temp/" });
const {
  checkCategoryAllowed,
  checkContentAllowed,
} = require("../../middlewares/content");
const {
  getContent,
  getContents,
  createContent,
  deleteContent,
} = require("../../controllers/content.controller");
const { validateId } = require("../../middlewares");

const router = Router();
/**
 * @openapi
 *   /api/v1/contents:
 *     get:
 *       tags:
 *         - Contents
 *       summary: Get all contents.
 *       responses:
 *         '200':
 *           description: OK. The request was successful.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Content'
 *         '500':
 *           description: Internal Server Error. Failed to retrieve contents.
 */

router.get("/", authenticateToken, getContents);

/**
 *  @openapi
 *   /api/v1/contents/{id}:
 *     get:
 *       tags:
 *         - Contents
 *       summary: Get a content.
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The id of the content.
 *       responses:
 *         '200':
 *           description: OK. The request was successful.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Content'
 *         '500':
 *           description: Internal Server Error. Failed to retrieve content.
 */
router.get("/:id", [authenticateToken, validateId], getContent);

/**
 * @openapi
 * /api/v1/contents:
 *   post:
 *     tags:
 *       - Contents
 *     summary: Create a content.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *                 description: Title of the content.
 *                 example: "Example title"
 *               Url:
 *                 type: string
 *                 description: URL of the content.
 *                 example: "https://example.com"
 *               file:
 *                 type: file
 *                 description: File of the content.
 *               CategoryId:
 *                 type: integer
 *                 description: ID of the category to which the content belongs.
 *                 example: 1
 *               TopicId:
 *                 type: integer
 *                 description: ID of the topic to which the content belongs.
 *                 example: 1
 *             required:
 *               - Title
 *               - CategoryId
 *               - TopicId
 *       responses:
 *         '201':
 *           description: OK. The request was successful.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Content'
 *         '500':
 *           description: Internal Server Error. Failed to create content.
 *           content:
 *             application/json:
 *               schema:
 *                 description: Internal Server Error. Failed to retrieve content.
 *         '401':
 *           description: Internal Server Error. Failed to create content.
 *           content:
 *             application/json:
 *               schema:
 *                 description: Internal Server Error. Failed to retrieve content.

 */

// *          '400':
// *            description: Bad Request.
// *            content:
// *              application/json:
// *                schema:
// *                  type: object
// *                  properties:
// *                    ok:false
// *                    status: 400,
// *                    message: "Category not allowed for this topic"
router.post(
  "/",
  [
    authenticateToken,
    upload.single("file"),
    checkCategoryAllowed,
    checkContentAllowed,
  ],
  createContent
);

router.delete("/:id", authenticateToken, deleteContent);

module.exports = router;
