/**
 * Copyright 2024 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { MouseEventHandler } from 'react';
import classes from './ToolCard.module.scss';
import { CardsListItem } from '@/components/CardsList/CardsListItem';
import { useAppContext } from '@/layout/providers/AppProvider';
import { isNotNull } from '@/utils/helpers';
import { Tool } from '@/app/api/tools/types';
import { useDeleteTool } from './hooks/useDeleteTool';
import { useModal } from '@/layout/providers/ModalProvider';
import { ToolExternalTag } from '../assistants/tools/ToolToggle';
import { getToolIcon, getToolReference, isExternalTool } from './utils';
import { ArrowUpRight, Edit } from '@carbon/react/icons';
import { ToolEditModal } from './manage/ToolEditModal';
import { ToolDetailModal } from './manage/ToolDetailModal';

interface Props {
  tool: Tool;
  onDeleteSuccess: (tool: Tool) => void;
  onSaveSuccess?: (tool: Tool) => void;
}

export function ToolCard({ tool, onDeleteSuccess, onSaveSuccess }: Props) {
  const { name, description, user_description, type } = tool;
  const { deleteTool, isPending: isDeletePending } = useDeleteTool({
    tool,
    onSuccess: () => onDeleteSuccess(tool),
  });
  const { isProjectReadOnly, project } = useAppContext();
  const { openModal } = useModal();

  const toolDescription =
    type === 'user' ? description : (user_description ?? description);

  return (
    <>
      <CardsListItem
        className={classes.root}
        title={name ?? ''}
        icon={<ToolIcon tool={tool} />}
        onClick={() =>
          openModal((props) =>
            tool.type === 'user' ? (
              <ToolEditModal
                {...props}
                project={project}
                tool={tool}
                onDeleteSuccess={onDeleteSuccess}
                onSaveSuccess={onSaveSuccess}
              />
            ) : (
              <ToolDetailModal {...props} tool={tool} />
            ),
          )
        }
        isDeletePending={isDeletePending}
        cta={
          tool.type === 'user'
            ? { title: 'Edit tool', icon: Edit }
            : { title: 'View details', icon: ArrowUpRight }
        }
        actions={
          !isProjectReadOnly && tool.type === 'user'
            ? [
                {
                  isDelete: true,
                  itemText: 'Delete',
                  onClick: () => deleteTool(),
                },
              ].filter(isNotNull)
            : undefined
        }
      >
        <div className={classes.body}>
          {toolDescription && (
            <p className={classes.description}>{toolDescription}</p>
          )}
          {isExternalTool(tool.type, tool.id) && <ToolExternalTag />}
        </div>
      </CardsListItem>
    </>
  );
}

export function ToolIcon({ tool }: { tool: Tool }) {
  const Icon = getToolIcon(getToolReference(tool));
  return (
    <span className={classes.icon}>
      <Icon size="20" />
    </span>
  );
}
