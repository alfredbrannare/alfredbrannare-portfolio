package se.alfredbrannare.backend.storage.service;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
  String upload(MultipartFile file);
}
