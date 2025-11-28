import { cn } from '@/utilities/cn'
import {
  RichText as PayloadRichText,
} from '@payloadcms/richtext-lexical/react'

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const RichText: React.FC<Props> = ({
  className,
  enableProse = true,
  enableGutter = true,
  ...rest
}) => {
  return (
    <PayloadRichText
      className={cn(
        {
          'container': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
