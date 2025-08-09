import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { Bold, Italic, Underline, List, ListOrdered, Link2, ImageIcon } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ content, onChange, placeholder, className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className={cn("border border-gray-200 rounded-lg", className)}>
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-white p-3 flex flex-wrap gap-2 rounded-t-lg">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "p-2 h-8 w-8",
            editor.isActive('bold') ? 'bg-gray-100' : ''
          )}
          data-testid="button-bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "p-2 h-8 w-8",
            editor.isActive('italic') ? 'bg-gray-100' : ''
          )}
          data-testid="button-italic"
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            "p-2 h-8 w-8",
            editor.isActive('strike') ? 'bg-gray-100' : ''
          )}
          data-testid="button-underline"
        >
          <Underline className="h-4 w-4" />
        </Button>

        <div className="w-px bg-gray-300 my-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "p-2 h-8 w-8",
            editor.isActive('bulletList') ? 'bg-gray-100' : ''
          )}
          data-testid="button-bullet-list"
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "p-2 h-8 w-8",
            editor.isActive('orderedList') ? 'bg-gray-100' : ''
          )}
          data-testid="button-ordered-list"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <div className="w-px bg-gray-300 my-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addLink}
          className={cn(
            "p-2 h-8 w-8",
            editor.isActive('link') ? 'bg-gray-100' : ''
          )}
          data-testid="button-link"
        >
          <Link2 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addImage}
          className="p-2 h-8 w-8"
          data-testid="button-image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor */}
      <div className="rounded-b-lg">
        <EditorContent 
          editor={editor} 
          className="min-h-[200px] focus-within:ring-2 focus-within:ring-celtic-green-500 rounded-b-lg"
          data-testid="rich-text-editor"
        />
      </div>
    </div>
  );
}
