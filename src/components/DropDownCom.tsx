import { Dropdown, DropdownItem, Modal, ModalBody, ModalHeader, Textarea } from "flowbite-react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deletePost } from "../features/Posts/apis/delete.post.api";
import { updatePost } from "../features/Posts/apis/update.post.api";
import type { Post } from "../interfaces/post.interface";

export function DropDownCom({ post }: { post: Post }) {
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState(post.body ?? "");
  const query = useQueryClient();
  const refresh = () => {
    query.invalidateQueries({ queryKey: ["posts"] });
    query.invalidateQueries({ queryKey: ["post", post._id] });
  };
  const remove = useMutation({ mutationFn: deletePost, onSuccess: () => { refresh(); toast.success("Post deleted"); } });
  const save = useMutation({
    mutationFn: updatePost,
    onSuccess: () => { refresh(); setEditing(false); toast.success("Post updated"); },
    onError: () => toast.error("Could not update post"),
  });

  function handleSave() {
    const formData = new FormData();
    formData.append("body", body.trim());
    save.mutate({ postId: post._id, formData });
  }

  return <>
    <Dropdown inline>
      <DropdownItem onClick={() => remove.mutate(post._id)} disabled={remove.isPending}>
        <span className="flex items-center"><MdDelete className="mx-1" /> Delete</span>
      </DropdownItem>
      <DropdownItem onClick={() => { setBody(post.body ?? ""); setEditing(true); }}>
        <span className="flex items-center"><FaEdit className="mx-1" /> Edit</span>
      </DropdownItem>
    </Dropdown>
    <Modal show={editing} onClose={() => setEditing(false)}>
      <ModalHeader>Edit post</ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          <Textarea value={body} onChange={(event) => setBody(event.target.value)} rows={5} maxLength={5000} />
          <div className="flex justify-end gap-2">
            <button className="rounded border px-4 py-2" onClick={() => setEditing(false)}>Cancel</button>
            <button className="rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-50" disabled={save.isPending || !body.trim()} onClick={handleSave}>{save.isPending ? "Saving…" : "Save changes"}</button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  </>;
}
