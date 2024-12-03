import { Node } from "prosemirror-model"
import { Extensions, getSchema, JSONContent } from "@tiptap/core"

export const isJSONContent = (doc: JSONContent, extensions: Extensions): boolean => {

    try {

      const schema = getSchema(extensions)
      const contentNode = Node.fromJSON(schema, doc)
      contentNode.check()

      return true

    } catch (e) {

      return false

    }

  }