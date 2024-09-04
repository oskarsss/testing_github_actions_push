import { GetNotesReply } from '@proto/notes';
import { NoteEntityType } from '@/models/notes/note-entity-type';
import { APIResponse } from '../types';

/** Notes */
namespace Notes {
    export type File = {
        name: string;
        url: string;
    };

    export type Note = {
        body: string;
        added_by: string;
        created_at: string;
    };

    export type Tabs = 'general' | 'team' | 'driver' | string;

    export type NoteType = GetNotesReply['notes'][0];

    export namespace API {
        export namespace Notes {
            export namespace Get {
                export type Request = {
                    entity_id: string;
                    entity_type: NoteEntityType;
                    category?: string;
                    from_datetime?: string;
                    public?: boolean;
                };

                export type Response = APIResponse<{
                    has_more_pages: boolean;
                    notes: {
                        data: NoteType[];
                        current_page: number;
                        first_page_url: string;
                        from: number;
                        path: string;
                        per_page: number;
                        next_page_url: string | null;
                        prev_page_url: string | null;
                        to: number;
                    };
                }>;
            }
        }

        export namespace Note {
            export namespace Create {
                export type Request = {
                    entity_id: string;
                    entity_type: NoteEntityType;
                    body: string;
                    files_data: string;
                };
                export type Response = APIResponse<{
                    entity_type: NoteEntityType;
                }>;
            }
        }
    }
}

export default Notes;
