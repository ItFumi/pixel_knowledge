class Step < ApplicationRecord
  # 3.ステップvs知識 (多vs1) = 複数のステップは1つの知識に属している。
  belongs_to :knowledge, optional: true, touch: true

  mount_uploader :picture, PictureUploader
end
